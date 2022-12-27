import axios from "axios";
import { userStore } from "../stores/userStore.js";
import { NotLoggedInError } from "../errors/NotLoggedInError.js";
import * as utils from "../utils/field-formatters";

export default class CRUD {
    #host = 'http://localhost:8080';
    #basePath = '/ComCom/diope/comcom/api/';

    constructor(model) {
        this.model = model;
        this.store = null;
    }

    axiosInstance() {
        let instance = axios.create();
        instance.defaults.headers.common["Content-type"] = "application/json";
        instance.defaults.headers.common["Token"] = userStore().chave;
        instance.defaults.headers.common["cpf"] = userStore().cpf;

        console.debug('CRUD cpf: ' + userStore().cpf);
        console.debug('CRUD Token: ' + userStore().chave);
        if( utils.isEmptyString(userStore().cpf) || utils.isEmptyString(userStore().chave ) ) {
            throw new NotLoggedInError();
        }
        return instance;
    }

    #buildPathParams(pathParams) {
        return (pathParams != undefined && pathParams != '' ? '/' + pathParams : '');
    }

    #buildQueryParams(...queryParams) {
        if (queryParams == undefined || queryParams.length == 0 || queryParams[0].length == 0) {
            return '';
        }
        let qp = '?';
        let first = 0;
        for (const q of queryParams) {
            qp += (first++ > 0 ? '& ' : '') + q;
        }
        return qp;
    }

    mountURL() {
        return this.mountURL(undefined, undefined);
    }

    mountURL(id) {
        this.mountURL(id, undefined);
    }

    mountURL(pathParams, ...queryParams) {
        return this.#host + this.#basePath + this.model
            + this.#buildPathParams(pathParams)
            + this.#buildQueryParams(queryParams);
    }

    async create(o) {
        console.log(o);
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

    async list() {
        return await this.axiosInstance().get(
            this.mountURL()
        );
    }

    async update(o) {
        console.log(o);
        return await this.axiosInstance().put(
            this.mountURL(),
            JSON.stringify(o)
        );
    }

    async delete(o) {
        console.log(o);
        return await this.axiosInstance().delete(
            this.mountURL(id)
        );
    }
}