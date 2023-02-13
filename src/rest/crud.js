import axios from 'axios';
import { usuariosStore } from '../stores/usuariosStore.js';
import { NotLoggedInError } from '../errors/NotLoggedInError.js';

export default class CRUD {
    #host = (import.meta.env.DEV ? 'https://10.200.182.42' : 'https://estaleiro.serpro.gov.br');
    //#host = 'https://comunica.hom.serpro/';
    #basePath = '/ComCom/diope/comcom/api/';

    constructor(model) {
        this.model = model;
        this.store = null;
    }

    axiosInstance(bSkipSSODataCheck = false) {
        if (usuariosStore().isThereSessionData(bSkipSSODataCheck) == false) {
            throw new NotLoggedInError();
        }

        let instance = axios.create();
        instance.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
        instance.defaults.headers.common['Token'] = 'Bearer ' + usuariosStore().token;
        instance.defaults.headers.common['cpf'] = usuariosStore().cpf;
        //instance.defaults.headers.common['Token'] = usuariosStore().token;
        //instance.defaults.headers.common['Comunica-Vue'] = 'SSOSUPOP ' + usuariosStore().sessionToken();
        //instance.defaults.headers.common['Authorization'] = 'Bearer ' + usuariosStore().sessionToken();
        /*
           sessionToken() {
              return localStorage.getItem(KEY_JWT);
            },
        */

        /*
        console.debug('CRUD CPF: ' + usuariosStore().cpf);
        console.debug('CRUD Token: ' + usuariosStore().token);
        */
        return instance;
    }

    #buildPathParams(pathParams) {
        if (pathParams == undefined || pathParams.length == 0) {
            return '';
        }
        let pp = '';
        for (const p of pathParams) {
            pp += '/' + p;
        }
        return pp;
    }

    #buildQueryParams(queryParams) {
        if (queryParams == undefined || queryParams.length == 0) {
            return '';
        }
        let qp = '';
        let first = 0;
        let isKey = true;
        for (const q of queryParams) {
            qp += (isKey ? (first++ > 0 ? '&' : '?') + q : ('=' + q));
            isKey = !isKey;
        }
        return qp;
    }

    mountURL() {
        return this.mountURL(undefined, undefined);
    }

    mountURL(id) {
        this.mountURL(id, undefined);
    }

    mountURL(pathParams, queryParams) {
        let url = this.#host + this.#basePath + this.model
            + this.#buildPathParams(pathParams)
            + this.#buildQueryParams(queryParams);
        console.log(url);
        return url;
    }

    create(o) {
        return this.axiosInstance().post(
            this.mountURL(),
            o
        );
    }

    retrieve(id, queryParams = undefined) {
        return this.axiosInstance().get(
            this.mountURL([id], queryParams)
        );
    }

    update(o) {
        return this.axiosInstance().put(
            this.mountURL(),
            o
        );
    }

    delete(id) {
        return this.axiosInstance().delete(
            this.mountURL([id])
        );
    }

    list(pathParams, queryParams) {
        return this.axiosInstance().get(
            this.mountURL(pathParams, queryParams)
        );
    }
}