import { defineStore } from 'pinia';
import * as errorUtils from '../errors/ErrorsUtils';

import Definicoes from '../rest/definicoes';
const definicoes = new Definicoes();

export const definicoesStore = defineStore('definicoesStore', {
  state: () => {
    return {
      outlookDestinatarios: [{
        id: '',
        descricao: '',
        email: ''
      }],
      eventos: {},
      perfis: {},
      destinosPublicacao:{},
      formatosPublicacao: [{
        key: '',
        value: ''
      }],
    };
  },
  getters: {
    eventosKeys: (state) => Object.keys(state.eventos),
    perfisKeys: (state) => Object.keys(state.perfis),
    destinosPublicacaoKeys: (state) => Object.keys(state.destinosPublicacao)
    },
  actions: {
    reloadAll() {
      // Destinatários Outlook
      definicoes.outlookDestinatarios().then((response) => {
        this.outlookDestinatarios = response.data;
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao obter destinatários Outlook');
      });
      // Eventos
      definicoes.eventos().then((response) => {
        this.eventos = response.data;
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao obter eventos');
      });
      // Perfis
      definicoes.perfis().then((response) => {
        this.perfis = response.data;
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao obter perfis');
      });
      // Destinos (Teams, Outlook, HTML, etc)
      definicoes.destinos().then((response) => {
        this.destinosPublicacao = response.data;
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao obter destinos');
      });
      // Tipos de publicações (templates de formatação com 'Em Tempo', 'Primeira Leitura', etc)
      definicoes.publicacoesTipos().then((response) => {
        this.formatosPublicacao = response.data;
      }).catch((e) => {
        errorUtils.treatError(e, 'Falha ao obter tipos de publicações');
      });
    },
  }
});
