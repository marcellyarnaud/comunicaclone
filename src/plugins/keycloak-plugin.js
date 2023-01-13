import Vue from 'vue';
import Keycloak from 'keycloak-js';

const initOptions = {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
};

const _keycloak = new Keycloak(initOptions);

const KeycloakPlugin = {
    install: Vue => {
        Vue.$keycloak = _keycloak;
    },
};
KeycloakPlugin.install = Vue => {
    Vue.$keycloak = _keycloak;
    Object.defineProperties(Vue.prototype, {
        $keycloak: {
            get() {
                return _keycloak;
            },
        },
    });
};

Vue.use(KeycloakPlugin);

export default KeycloakPlugin;