import { defineStore } from "pinia";
import Comunicacao from "../rest/comunicacao";
import * as errorUtils from '../errors/ErrorsUtils';
import * as utils from '../utils/index';

const comunicacao = new Comunicacao();

export const comunicacoesStore = defineStore("comunicacoesStore", {
  state: () => {
    return {
      comunicacaoAllFields: [
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
    reset() {
      this.comunicacoes.length = 0;
      this.index = -1;
    },
    get(id) {
      return this.comunicacoes.find((element) => element.id = id);
    },
    async getAllFields(id) {
      if (id == null) {
        return null;
      }
      await comunicacao.retrieve(id).then((response) => {
        this.comunicacaoAllFields = response.data;
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao recuperar todos os campos do registro');
      });
    },
    async create(o) {
      await comunicacao.create(o).then((response) => {
        this.comunicacoes.push(o);
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao incluir registro');
      });
    },
    async delete(id) {
      let index = this.comunicacoes.findIndex(id);
      if (index >= 0) {
        await comunicacao.delete(index).then((response) => {
          this.comunicacoes.splice(index, 1);
        }).catch((e) => {
          errorUtils.treatError(e, 'Falha ao excluir registro');
        });
      }
    },
    async update(o) {
      let index = this.comunicacoes.findIndex(o.id);
      if (index >= 0) {
        await comunicacao.update(index).then((response) => {
          this.comunicacoes.splice(index, 1);
          this.comunicacoes.push(o);
        }).catch((e) => {
          errorUtils.treatError(e, 'Falha ao atualizar comunicação');
        });
      }
    },
    async list(colunas, pathParams, qp) {
      let queryParams = utils.createdParamsArray(colunas, qp);

      await comunicacao.list(pathParams, queryParams).then((response) => {
        this.comunicacoes = response.data;
        this.index = (this.comunicacoes.length > 0) ? 0 : -1;
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao listar comunicações');
      });
    }
  }
});
