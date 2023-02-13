<template>
    <div>
        <AppHeader id="header" class="app-header navbar" :nome="usuariosStore.username" :perfil="usuariosStore.perfil"
            :cpf="usuariosStore.cpf">
        </AppHeader>

        <router-view />

        <AppFooter></AppFooter>
    </div>
</template>
<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import LoginPage from "./LoginPage.vue";
import { storesCommon } from "../mixins/storesCommon";

export default {
    name: "HomePage",
    mixins: [storesCommon],
    components: {
        AppHeader,
        AppFooter,
        LoginPage
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