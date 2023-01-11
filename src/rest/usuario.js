import CRUD from "./crud.js";
export default class Usuario extends CRUD {

    constructor() {
        super('usuarios');
    }

    async sessionExpired(cpf)   {
        return await this.axiosInstance(true).get(
            this.mountURL(['checksession', cpf])
        );
    }

    async loggedIn(o)   {
        return await this.axiosInstance(true).put(
            this.mountURL(['ssodata']),
            o
        );
    }

    async mySSOData()   {
        return await this.axiosInstance(true).get(
            this.mountURL(['ssodata'])
        );
    }
}