import axios from "axios";
import { userStore } from "../stores/userStore.js";
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
        instance.defaults.headers.common["Token"] = userStore().chave;
        instance.defaults.headers.common["cpf"] = userStore().cpf;

        console.debug('CRUD cpf: ' + userStore().cpf);
        console.debug('CRUD Token: ' + userStore().chave);
        if (utils.isEmptyString(userStore().cpf) || utils.isEmptyString(userStore().chave)) {
            throw new NotLoggedInError();
        }
        return instance;
    }

    #buildPathParams(pathParams) {
        return (pathParams != undefined && pathParams != '' ? '/' + pathParams : '');
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
            JSON.stringify(o)
        );
    }

    async retrieve(id) {
        return await this.axiosInstance().get(
            this.mountURL(id)
        );
    }

    async update(o) {
        return await this.axiosInstance().put(
            this.mountURL(),
            JSON.stringify(o)
        );
    }

    async delete(o) {
        return await this.axiosInstance().delete(
            this.mountURL(id)
        );
    }

    async list(pathParams, queryParams) {
        return await this.axiosInstance().get(
            this.mountURL(pathParams, queryParams)
        );
    }
}