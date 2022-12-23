import { comunicacoesStore } from "../stores/comunicacoesStore.js";
import CRUD from "./crud.js";

export default class Comunicacao extends CRUD {

    constructor() {
        super('comunicacao');
        this.comunicacaoStore = comunicacoesStore();
    }

    async create(o) {
        console.log(o);
        await super.create(o).then((o) => {
            this.comunicacaoStore.add(o);
        }
        ).catch((e) => {
            console.log(e);
        });
    }

    async retrieve() {
        return null;
    }

    list() {
        super.list().then( (response) => {
            console.log('Antes');
            console.log(response.status);
            console.log('Depois');
            console.log(response.data);
            //this.comunicacaoStore.replace(l);
        }).catch( (e) => {
            console.log(e);
        })
        
    }

    async update(o) {
        console.log(o);
        return null;
    }

    async delete(o) {
        console.log(o);
        return null;
    }
}