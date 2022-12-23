<template>
    <div>
        <AppHeader id="header" class="app-header navbar" :nome="store.username" :perfil="store.perfil" :cpf="store.cpf"
            :isLoggedIn=isLoggedIn>
        </AppHeader>

        <router-view/>

        <AppFooter></AppFooter>
    </div>
</template>
<script>
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import LoginPage from "./LoginPage.vue";
import { userStore } from "../stores/userStore.js";

export default {
    name: "HomePage",
    components: {
        AppHeader,
        AppFooter,
        LoginPage
    },
    data() {
        return {
            store: userStore(),
        }
    },
    computed: {
        isLoggedIn() {
            return this.store.isLoggedIn;
        }
    }
}
</script>
<style>
.app-loading__spinner {
    top: 50px !important;
}

.was-validated .form-control:invalid~.invalid-feedback,
.form-control.is-invalid~.invalid-feedback {
    flex-direction: row !important;
}

.form-control.is-valid~.invalid-feedback {
    display: none;
}
</style>