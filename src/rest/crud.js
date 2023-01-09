import axios from "axios";
import { usuariosStore } from "../stores/usuariosStore.js";
import { NotLoggedInError } from "../errors/NotLoggedInError.js";
import * as utils from "../utils/field-formatters";

export default class CRUD {
    #host = 'http://localhost:8080';
    //#host = 'https://comunica.hom.serpro/';
    #basePath = '/ComCom/diope/comcom/api/';

    constructor(model) {
        this.model = model;
        this.store = null;
    }

    axiosInstance() {
        let instance = axios.create();
        instance.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
        //instance.defaults.headers.common["Token"] = usuariosStore().chave;
        instance.defaults.headers.common["Comunica-Vue"] = "SSOSUPOP " + usuariosStore().chave;
        //instance.defaults.headers.common["Authorization"] = "Bearer " + usuariosStore().chave;
        instance.defaults.headers.common["cpf"] = usuariosStore().cpf;

        console.debug('CRUD cpf: ' + usuariosStore().cpf);
        console.debug('CRUD Token: ' + usuariosStore().chave);
        if (utils.isEmptyString(usuariosStore().cpf) || utils.isEmptyString(usuariosStore().chave)) {
            throw new NotLoggedInError();
        }
        return instance;
    }

    #buildPathParams(pathParams) {
        if (pathParams == undefined || pathParams.length == 0)  {
            return '';            
        }
        let pp = '';
        for(const p of pathParams)  {
            pp +=  '/' + p;
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

    async create(o) {
        return this.axiosInstance().post(
            this.mountURL(),
            o
        );
    }

    async retrieve(id) {
        return await this.axiosInstance().get(
            this.mountURL([id])
        );
    }

    async update(o) {
        return await this.axiosInstance().put(
            this.mountURL(),
            o
        );
    }

    async delete(id) {
        return await this.axiosInstance().delete(
            this.mountURL([id])
        );
    }

    async list(pathParams, queryParams) {
        return await this.axiosInstance().get(
            this.mountURL(pathParams, queryParams)
        );
    }
}