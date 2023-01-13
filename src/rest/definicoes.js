import CRUD from "./crud.js";
export default class Definicoes extends CRUD {

    constructor() {
        super('definicoes');
    }

    async eventos()   {
        await this.axiosInstance(true).get(
            this.mountURL(['eventos'])
        ).then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }
    async perfis()   {
        await this.axiosInstance(true).get(
            this.mountURL(['perfis'])
        ).then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }
    async outlookDestinatarios()   {
        await this.axiosInstance(true).get(
            this.mountURL(['outlook/destinatarios'])
        ).then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }
    async destinos()   {
        await this.axiosInstance(true).get(
            this.mountURL(['destinos'])
        ).then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }
    async publicacoesTipos()   {
        await this.axiosInstance(true).get(
            this.mountURL(['publicacoes/tipos'])
        ).then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }
    /*
    async eventos()   {
        await this.axiosInstance(true).get(
            this.mountURL(['configuracoes/msteams'])
        ).then((response) => {
            console.log(JSON.stringify(response.data));
        });
    }
    */
}