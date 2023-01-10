import { notificationMessages } from "../mixins/notificationMessages";

export const KEY_CPF = 'cpf';
export const KEY_JWT = 'jwt';

export function setItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        notifyMessage('Localstorage', e, Error);
    }
}

export function getItem(key) {
    try {
        localStorage.getItem(key);
    } catch (e) {
        notifyMessage('Localstorage', e, Error);
    }
}

export function removeItem(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        notifyMessage('Localstorage', e, Error);
    }
}

export function clear(key) {
    try {
        localStorage.clear();
    } catch (e) {
        notifyMessage('Localstorage', e, Error);
    }
}