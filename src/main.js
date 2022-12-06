import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import  * as components from "bootstrap-vue/esm/components";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/vendor/serpro-design-base.css";
import "./assets/css/app.css";
import "../node_modules/fontawesome-free-v6/css/fontawesome.min.css";
import "../node_modules/fontawesome-free-v6/webfonts/fa-regular-400.woff2";
import "../node_modules/fontawesome-free-v6/webfonts/fa-regular-400.ttf";
import "../node_modules/fontawesome-free-v6/webfonts/fa-solid-900.woff2";
import "../node_modules/fontawesome-free-v6/webfonts/fa-solid-900.ttf";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(components);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')