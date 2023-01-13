<template>
    <div class="app-body">

        <main class="main">
            <div>
                <div class="tab-pane" id="tabTemplateAguarde" style="display: none;">
                    <section>
                        <div class="app-loading">
                            <br /><br />
                            <h1 class="app-loading__description">Aguarde! <span id="loading-action">Carregando
                                    aplicação...</span></h1>
                            <div class="app-loading__logo"></div>
                            <svg class="app-loading__spinner" viewBox="25 25 50 50">
                                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                                    stroke-miterlimit="10" />
                            </svg>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    name: "LoginPage",
    loaded() {
        //this.$router.push({ name: 'frontPage' }, () => { console.debug('Ok') }, (e) => { console.debug('Error: ' + e) });
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