import { usuariosStore } from '../stores/usuariosStore';
import { comunicacoesStore } from '../stores/comunicacoesStore';
import { definicoesStore } from '../stores/definicoesStore'

export var storesCommon = {
    data() {
        return {
            usuariosStore: usuariosStore(),
            comunicacoesStore: comunicacoesStore(),
            definicoesStore: definicoesStore()
        }
    },
    computed: {
        username() {
            return this.usuariosStore ? this.usuariosStore.username : '';
        },
        isLoggedIn() {
            return this.usuariosStore ? this.usuariosStore.isLoggedIn : false;
        }
    }
}
