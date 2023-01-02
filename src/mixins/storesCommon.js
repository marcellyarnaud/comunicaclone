import { userStore } from "../stores/userStore";
import { comunicacoesStore } from "../stores/comunicacoesStore";

export var storesCommon = {
    data() {
        return {
            userStore: userStore(),
            comunicacoesStore: comunicacoesStore()
        }
    },
    computed: {
        username() {
            return this.userStore ? this.userStore.username : '';
        },
        isLoggedIn() {
            return this.userStore ? this.userStore.isLoggedIn : false;
        }
    }
}
