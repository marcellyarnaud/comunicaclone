import { HttpStatusCode } from 'axios';
import { defineStore } from 'pinia';
import Usuario from '../rest/usuario';
import * as errorUtils from '../errors/ErrorsUtils';
import { KEY_CPF, KEY_JWT } from '../utils/localStorage';
import * as utils from '../utils/index';
import * as AppRouter from '../router/index';

const usuario = new Usuario();

export const usuariosStore = defineStore('usuariosStore', {
  state: () => {
    return {
      // usuário logado
      cpf: '',
      nome: '',
      email: '',
      departamento: '',
      funcao: '',
      perfil: '',
      uf: '',
      token: '',

      // gestão de usuários no backend
      usuarios: [
        {
          id: '',
          nome: '',
          email: '',
          teams: '',
          perfil: '',
          uf: '',
          departamento: '',
          funcao: '',
          timeStamp: 0,
          bloqueado: undefined,
        }
      ],
      index: -1,
    };
  },
  getters: {
    username: (state) => state.nome,

    selecionado: (state) => state.usuarios[state.index] | null,
    length: (state) => state.usuarios.length,
    isEmpty: (state) => state.usuarios.isEmpty,
    listaUsuarios: (state) => state.usuarios,
    //isLoggedIn: (state) => utils.isEmptyString(state.cpf) == false && localStorage.getItem(KEY_JWT) == false,
    },
  actions: {
    loggedInUser(keycloak) {
      this.nome = keycloak.tokenParsed.NOME;
      this.cpf = keycloak.tokenParsed.CPF;
      this.email = keycloak.tokenParsed.email
      this.departamento = keycloak.tokenParsed.departamento;
      this.funcao = keycloak.tokenParsed.funcao;
      this.uf = keycloak.tokenParsed.uf;
      this.token = keycloak.idToken;

      localStorage.setItem(KEY_CPF, this.cpf);

      this.perfilUsuarioLogado();

      AppRouter.router.push({ name: 'frontPage' }, () => { console.debug('Ok') }, (e) => { console.debug('Error: ' + e) });
    },
    isLoggedIn()  {
      return utils.isEmptyString(this.cpf) == false && utils.isEmptyString(localStorage.getItem(KEY_JWT)) == false;
    },
    geraTeamsAddress(email) {
      return 'https://teams.microsoft.com/l/chat/0/0?users=' + email;
    },
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
    async perfilUsuarioLogado() {
      let queryParams = utils.createdParamsArray('perfil');
      await usuario.retrieve(this.cpf, queryParams).then((response) => {
        console.debug('Perfil retornado: ' + response.data.perfil);
        this.perfil = response.data.perfil;
      }).catch((e) => {
        console.debug('Falhou a busca do perfil: ' + JSON.stringify(e));
      })
    },
    isThereSessionData(bSkipSSODataCheck) {
      if (utils.isEmptyString(this.cpf) == false && utils.isEmptyString(this.token) == false) {
        return true;
      }
      if (utils.isEmptyString(localStorage.getItem(KEY_CPF)) || utils.isEmptyString(localStorage.getItem(KEY_JWT))) {
        return false;
      }
      this.cpf = localStorage.getItem(KEY_CPF);

      if (bSkipSSODataCheck == false) {
        usuario.mySSOData().then((response) => {
          console.debug('Updating user store after refresh!');
        }).catch((e) => {
          console.debug('Erro buscando SSO Data quando perdeu detalhe sessão: ' + e);
        })
      }
      return true;
    }
  }
});
