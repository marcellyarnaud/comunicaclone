import { usuariosStore } from "../stores/usuariosStore";
import { comunicacoesStore } from "../stores/comunicacoesStore";

export var storesCommon = {
    data() {
        return {
            usuariosStore: usuariosStore(),
            comunicacoesStore: comunicacoesStore()
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
