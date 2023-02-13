import CRUD from "./crud.js";
export default class Usuario extends CRUD {

    constructor() {
        super('usuarios');
    }

    sessionExpired(cpf)   {
        return this.axiosInstance(true).get(
            this.mountURL(['checksession', cpf])
        );
    }

    loggedIn(o)   {
        return this.axiosInstance(true).put(
            this.mountURL(['ssodata']),
            o
        );
    }

    mySSOData()   {
        return this.axiosInstance(true).get(
            this.mountURL(['ssodata'])
        );
    }
}