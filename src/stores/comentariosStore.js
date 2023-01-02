import { defineStore } from "pinia";
import { NotLoggedInError } from "../errors/NotLoggedInError";
import Comentario from "../rest/comentario";
import { ERROR, notifyMessage, notifyNotLoggedIn } from "../mixins/notificationMessages";
import * as errorUtils from '../errors/ErrorsUtils';

const comentario = new Comentario();

export const comentariosStore = defineStore("comentariosStore", {
  state: () => {
    return {
      comentarios: [
        {
          id: "",
          acao: "",
          adicionarReacao: false,
          timeStamp: 0,
          titulo: "",
          resumo: "",
          detalhe: "",
          positivo: 0,
          negativo: 0,
          cabecalho: [
            {
              title: "",
              value: ""
            },
          ],
          rodape: [
            {
              title: "",
              value: ""
            },
          ],
          comentarioPaiId: null,
          siteComunica: ""
        }
      ],
      index: -1
    };
  },
  getters: {
    selecionada: (state) => state.comentarios[state.index] | null,
    length: (state) => state.comentarios.length,
    isEmpty: (state) => state.comentarios.isEmpty,
    listaComunicacoes: (state) => state.comentarios
  },
  actions: {
    async add(o) {
      await comentario.create(o).then((response) => {
        this.comentarios.push(o);
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao incluir comentário');
      });
    },
    async delete(id) {
      let index = this.comentarios.findIndex(id);
      if (index >= 0) {
        await comentario.delete(index).then((response) => {
          this.comentarios.splice(index, 1);
        }).catch((e) => {
          errorUtils.treatError(e, 'Falha ao excluir comentário');
        });
      }
    },
    async update(o) {
      let index = this.comentarios.findIndex(o.id);
      if (index >= 0) {
        await comentario.update(index).then((response) => {
          this.comentarios.splice(index, 1);
          this.comentarios.push(o);
        }).catch((e) => {
          errorUtils.treatError(e, 'Falha ao atualizar comentário');
        });
      }
    },
    async list(o) {
      await comentario.list(o.id).then((response) => {
        this.comentarios = response.data;
      }).catch((e) => {
        errorUtils(e, 'Falha ao listar comentário');
      });
    }
  }
});
