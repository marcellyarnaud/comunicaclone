<script lang="ts">
import { ref } from 'vue';
import HomePage from './components/HomePage.vue';

export default {
    setup() {
        const msg = ref("Hello World!");
        return { msg };
    },
    methods: {
        pega() {
            try {
                fetch("http://localhost:8080/ComCom/diope/comcom/api/comunicacao/62e3eee94c012dd283455d70/true", {
                    method: "PUT",
                    body: "Gostei demais!. Seria muito bom receber mais comunicações deste tipo.",
                    headers: new Headers({ "content-type": "application/json" }),
                }).then(data => { return data; }).catch(e => {
                    console.log(e);
                    return "Catch: " + e;
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    },
    components: { HomePage }
}
</script>

<template>
  <!--
  <h1>{{ msg }}</h1>
  <input v-model="msg">
  <button @click="pega()">Clique aqui</button>
  -->
  <HomePage></HomePage>
</template>