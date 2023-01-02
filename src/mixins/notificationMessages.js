import { vm } from "../main";

export const INFO = 'I';
export const ERROR = 'E';
export const SUCCESS = 'S';
export const WARNING = 'A';

export var notificationMessages = {
    methods: {
        notify(titulo, content, tipo) {
            return notifyMessage(titulo, content, tipo);
        }
    }
}

export function notifyMessage(titulo, content, tipo, to, href) {

    tipo = tipo.toUpperCase();
    if (tipo == INFO || tipo == 'INFO' || tipo == undefined) tipo = 'info';
    else if (tipo == SUCCESS) tipo = 'success';
    else if (tipo == WARNING) tipo = 'warning';
    else if (tipo == ERROR) tipo = 'danger';

    //this.$root.$bvToast.toast(content, {
    vm.$root.$bvToast.toast(
        content,
        {
            title: titulo,
            variant: tipo,
            solid: true,
            autohidedelay: 15000,
            //to: 'home',
            href: '/'
        }
    );
}

export function notifyNotLoggedIn() {
    return notifyMessage(
        'Usuário não logado!',
        'Clique aqui para fazer o login no sistema.',
        ERROR,
        '/'
    )
}
