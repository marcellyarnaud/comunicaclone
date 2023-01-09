import { HttpStatusCode } from "axios";
import { defineStore } from "pinia";
import Usuario from "../rest/usuario";
import * as errorUtils from '../errors/ErrorsUtils';
import { notifyNotLoggedIn } from "../mixins/notificationMessages";

const usuario = new Usuario();

export const usuariosStore = defineStore("usuariosStore", {
  state: () => {
    return {
      // usuário logado
      token: {
        string: '',
        used_at: 0,
        created_at: 0
      },
      user: {
        cpf: '',
        nome: '',
        email: '',
        conexao: ''
      },
      perfil: '',

      // gestão de usuários no backend
      usuarios: [
        {
          id: '',
          nome: '',
          email: '',
          teams: '',
          perfil: '',
          timeStamp: 0,
          bloqueado: undefined,
          positivo: 0,
          ssoData: {}
        }
      ],
      index: -1,
    };
  },
  getters: {
    username: (state) => state.user.nome,
    cpf: (state) => state.user.cpf,
    email: (state) => state.user.email,
    chave: (state) => state.token.string,
    isLoggedIn: (state) => state.token.string.length > 10,

    selecionado: (state) => state.usuarios[state.index] | null,
    length: (state) => state.usuarios.length,
    isEmpty: (state) => state.usuarios.isEmpty,
    listaUsuarios: (state) => state.usuarios
  },
  actions: {
    reset() {
      this.usuarios.length = 0;
      this.index = -1;
    },
    async add(o) {
      await usuario.create(o).then((response) => {
        this.usuarios.push(o);
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao incluir registro');
      });
    },
    async delete(id) {
      let index = this.usuarios.findIndex(id);
      if (index >= 0) {
        await usuario.delete(index).then((response) => {
          this.usuarios.splice(index, 1);
        }).catch((e) => {
          errorUtils.treatError(e, 'Falha ao excluir registro');
        });
      }
    },
    async update(o) {
      let index = this.usuarios.findIndex(o.id);
      if (index >= 0) {
        await usuario.update(index).then((response) => {
          this.usuarios.splice(index, 1);
          this.usuarios.push(o);
        }).catch((e) => {
          errorUtils.treatError(e, 'Falha ao atualizar registro');
        });
      }
    },
    async list(colunas, pathParams, qp) {
      let queryParams = utils.createdParamsArray(colunas, qp);

      await usuario.list(pathParams, queryParams).then((response) => {
        this.usuarios = response.data;
        this.index = (this.usuarios.length > 0) ? 0 : -1;
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao listar registros');
      });
    },

    // Métodos para tratar login e sessão do usuário
    async loggedIn() {
      await usuario.loggedIn({
        'id': this.cpf,
        'nome': this.nome,
        'email': this.email,
        'perfil': this.perfil,
        'bloqueado': false,
        'ssoData': {
          'token': this.token,
          'user': this.user
        }
      }).then((response) => {
        if (response == HttpStatusCode.Ok) {
          let element = this.usuarios.find(element => element.id === this.cpf);
          if (element) {
            element.teams = response.data.teams;
          }
          console.log('element:' + element);
        } else  {
          errorUtils.treatWarning(response.code, response.data);
        }
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao cadatrar sessão');
      });
    },
    async sessionExpired() {
      await usuario.sessionExpired(this.cpf).then((response) => {
        if (response.code == HttpStatusCode.NotFound) {
          notifyNotLoggedIn();
        }
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao verificar sessão');
      });
    }
  }
});
