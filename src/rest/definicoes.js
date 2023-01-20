import CRUD from "./crud.js";
export default class Definicoes extends CRUD {

    constructor() {
        super('definicoes');
    }

    eventos()   {
        return this.axiosInstance(true).get(
            this.mountURL(['eventos'])
        );
    }
    perfis()   {
        return this.axiosInstance(true).get(
            this.mountURL(['perfis'])
        );
    }
    outlookDestinatarios()   {
        return this.axiosInstance(true).get(
            this.mountURL(['outlook/destinatarios'])
        );
    }
    destinos()   {
        return this.axiosInstance(true).get(
            this.mountURL(['destinos'])
        );
    }
    publicacoesTipos()   {
        return this.axiosInstance(true).get(
            this.mountURL(['publicacoes/tipos'])
        );
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