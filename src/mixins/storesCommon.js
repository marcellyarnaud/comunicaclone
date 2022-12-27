import { userStore } from "../stores/userStore";
import { comunicacoesStore } from "../stores/comunicacoesStore";

export const storesCommon = {
    data() {
        return {
            userStore: userStore(),
            comunicacoesStore: comunicacoesStore()
        }
    },
    computed: {
        username() {
            return this.userStore.username;
        },
        isLoggedIn() {
            return this.userStore.isLoggedIn;
        }
    }
}
