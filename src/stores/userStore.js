import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => {
    return {
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
      perfil: ''
    };
  },
  getters: {
    username: (state) => state.user.nome,
    cpf: (state) => state.user.cpf,
    chave: (state) => state.token.string,
    isLoggedIn: (state) => state.token.string.length > 10,
  }
});
