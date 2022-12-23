import { defineStore } from "pinia";

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
  methods: {
    add(json) {
      this.state.comunicacoes.push(json);
    },
    delete(id) {
      let index = this.state.comunicacoes.findIndex(id);
      if (index >= 0) {
        this.state.comunicacoes.splice(index, 1);
      }
    },
    update(o) {
      let index = this.state.comunicacoes.findIndex(o.id);
      if (index >= 0) {
        this.state.comunicacoes.splice(index, 1);
        this.state.comunicacoes.push(o);
      }
    },
    replace(list) {
      this.state.comunicacoes = list;
    }
  }
});
