export class NotLoggedInError extends Error   {
    constructor()   {
        super('Usuário não está logado!');
        this.name = 'NotLoggedInError';
    }
}