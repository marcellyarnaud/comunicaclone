import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import * as components from 'bootstrap-vue/esm/components';
import { installComponentsGlobals } from './components/globals';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/vendor/serpro-design-base.css';
import './assets/css/app.css';
import '../node_modules/fontawesome-free-v6/css/fontawesome.min.css';
import '../node_modules/fontawesome-free-v6/webfonts/fa-regular-400.woff2';
import '../node_modules/fontawesome-free-v6/webfonts/fa-regular-400.ttf';
import '../node_modules/fontawesome-free-v6/webfonts/fa-solid-900.woff2';
import '../node_modules/fontawesome-free-v6/webfonts/fa-solid-900.ttf';

import { createPinia, PiniaVuePlugin } from 'pinia';
import { router } from '../src/router/index.js';
import VueRouter from 'vue-router';
import Keycloak from 'keycloak-js';

import Vuelogger from 'vuejs-logger'
import { BVToastPlugin } from 'bootstrap-vue';
import { usuariosStore } from './stores/usuariosStore';

Vue.use(BVToastPlugin);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(components);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);

Vue.use(Vuelogger);

// injetando propriedades e funções comuns em todos os componentes
installComponentsGlobals(Vue);

const pinia = createPinia();

let initOptions = {
  url: 'https://d-keycloak.estaleiro.serpro.gov.br/auth',
  realm: 'serpro',
  clientId: 'h_comunica',
  onLoad: 'login-required',
  adapter: 'default',
  checkLoginIframe: false,
  //checkLoginIframeInterval: 86400,
  enableLogging: true,
}
const token = localStorage.getItem('_kc_token');
const refreshToken = localStorage.getItem('_kc_refreshToken');
if (token && refreshToken) {
  initOptions.token = token;
  initOptions.refreshToken = refreshToken;
};

export let keycloak = new Keycloak(initOptions);

let authenticated = await keycloak.init(initOptions);

export const vm = new Vue({
  router: router,
  pinia,
  render: h => h(App, { props: { keycloak: keycloak } }),
}).$mount('#app');

if (!authenticated) {
  console.log('GIA: Não autenticado');
  await keycloak.login().then((response) => {
    console.debug('GIA: ' + JSON.stringify(response));
    usuariosStore().loggedInUser(keycloak);
  }
  ).catch((e) => {
    console.log('GIA: ' + JSON.stringify(e));
  });
}

localStorage.setItem('_kc_token', keycloak.token);
localStorage.setItem('_kc_refreshToken', keycloak.refreshToken);

keycloak.OnAuthRefreshSuccess = () => {
  localStorage.setItem('_kc_token', keycloak.token);
  localStorage.setItem('_kc_refreshToken', keycloak.refreshToken);
};
keycloak.OnTokenExpired = () => {
  keycloak.updateToken(30).then((refreshed) => {
    if( refreshed ) {
      console.debug('GIA: Token foi atualizado - ' + keycloak.token);
    } else  {
      console.debug('GIA: Token ainda é válido.');
    }
  });
};

usuariosStore().loggedInUser(keycloak);
