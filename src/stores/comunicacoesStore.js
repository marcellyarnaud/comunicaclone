import { defineStore } from "pinia";
import { NotLoggedInError } from "../errors/NotLoggedInError";
import Comunicacao from "../rest/comunicacao";
import { ERROR, notifyMessage, notifyNotLoggedIn } from "../mixins/notificationMessages";

const comunicacao = new Comunicacao();

export const comunicacoesStore = defineStore("comunicacoesStore", {
  state: () => {
    return {
      comunicacoes: [
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
          comunicacaoPaiId: null,
          siteComunica: ""
        }
      ],
      index: -1
    };
  },
  getters: {
    selecionada: (state) => state.comunicacoes[state.index] | null,
    length: (state) => state.comunicacoes.length,
    isEmpty: (state) => state.comunicacoes.isEmpty,
    listaComunicacoes: (state) => state.comunicacoes
  },
  actions: {
    async add(json) {
      console.log(o);
      await comunicacao.create(o).then((o) => {
        this.comunicacoes.push(json);
      }
      ).catch((e) => {
        console.log(e);
        if( e instanceof NotLoggedInError ) {
          notifyNotLoggedIn();
        }
      });
    },
    async delete(id) {
      let index = this.comunicacoes.findIndex(id);
      if (index >= 0) {
        this.comunicacoes.splice(index, 1);
      }
    },
    async update(o) {
      let index = this.comunicacoes.findIndex(o.id);
      if (index >= 0) {
        this.comunicacoes.splice(index, 1);
        this.comunicacoes.push(o);
      }
    },
    async replace(list) {
      this.comunicacoes = list;
    },
    async list() {
      await comunicacao.list().then((response) => {
        this.comunicacoes = response.data;
      }).catch((e) => {
        if( e instanceof NotLoggedInError ) {
          notifyNotLoggedIn();
        } else  {
          notifyMessage('Falha ao listar comunicações', e.message, ERROR);
        }
      })
    }
  }
});
