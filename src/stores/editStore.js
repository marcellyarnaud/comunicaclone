import { defineStore } from 'pinia';

export const editStore = defineStore('editStore', {
  state: () => {
    return {
      editor: {}
    };
  },
  getters: {
    html: (state) => state.editor.value,
  },
  actions: {
  }
});
