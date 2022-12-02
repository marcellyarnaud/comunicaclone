<template>
    <div>
        <AppHeader id="header" class="app-header navbar"></AppHeader>

        <!-- div id="bs-modal-plugin"></div -->

        <div class="app-body">

            <div aria-hidden="false" class="sidebar">
                <div class="sidebar-nav ps" role="nav">
                    <div id='sv-menu'></div>
                    <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
                        <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                    </div>
                    <div class="ps__rail-y" style="top: 0px; right: 0px;">
                        <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                    </div>
                </div>

                <button class="sidebar-minimizer" sdbrandminimizer="" sdsidebarminimizer="" type="button"></button>
            </div>


            <main class="main">
                <div>
                    <div class="tab-pane" id="tabTemplateAguarde">
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
                    <div class="tab-pane" id="tabTemplateLogin" style="display: none;">

                        <div class="page-auth">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-sm-5 d-none d-sm-block bg-login-unico2">
                                    </div>
                                    <div id="semtextocv1" class="col-sm-7 bg-edit">
                                        <div class="app flex-row">
                                            <div class="container py-4">
                                                <div class="text-right mb-5">
                                                    <img class="logoSerpro" src="../assets/images/logo-serpro.png">
                                                </div>
                                                <div class="mx-5">
                                                    <div class="mt-3 mb-4">
                                                        <img src="../assets/images/solucoes-corporativas.png"
                                                            alt="Soluções Corporativas">
                                                    </div>
                                                    <h1 class="h3 heading mb-4">Login único</h1>
                                                    <p class="font-italic">
                                                        Acesse os sistemas do Serpro usando um único login.
                                                    </p>
                                                    <form id="frmLogin">
                                                        <div id="username" class="dynamic-field" data-input-type="cpf"
                                                            aria-label="CPF" aria-required="true"
                                                            data-placeholder="Digite aqui o CPF"></div>
                                                        <div id="frmLogin-password-group" class="form-group"
                                                            data-input-type="senha" placeholder="Informe sua senha"
                                                            aria-label="Senha" aria-required="true">
                                                            <label for="frmLogin-password"
                                                                class="control-label"><em>*</em>
                                                                Senha</label>
                                                            <div class="input-group">
                                                                <input id="frmLogin-password" name="Senha"
                                                                    class="form-control" type="password"
                                                                    data-input-type="senha">
                                                                <button class="btn btn-secondary px-2"
                                                                    id="button-addon2" title="mostrar/ocultar senha"
                                                                    type="button">
                                                                    <i id="viewPasswd" aria-hidden="true"
                                                                        class="fas fa-eye"></i>
                                                                </button>
                                                            </div>
                                                            <div id="frmLogin-password-message" class="label"></div>
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="custom-control custom-checkbox">
                                                                <input class="custom-control-input" type="checkbox"
                                                                    value="" id="lembra-senha">
                                                                <label class="custom-control-label"
                                                                    for="lembra-senha">Lembrar senha</label>
                                                                <a href="auth/esqueci-minha-senha">Esqueceu sua
                                                                    senha</a>
                                                            </div>
                                                        </div>
                                                        <p class="mb-5">

                                                        </p>
                                                        <div class="form-group mb-5">
                                                            <button class="btn btn-primary" id="btn-entrar"
                                                                type="submit">Entrar</button>
                                                        </div>
                                                    </form>
                                                    <p>
                                                    <form id="frmCertificado">
                                                        <button id="btn-certificado" class="certificado-digital">
                                                            <i aria-hidden="true" class="far fa-address-card mr-1"></i>
                                                            Acesse com Certificado Digital</button>
                                                    </form>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="tab-pane" id="tabTemplateConteudo" style="display: none;">
                    </div>
                    <div class="tab-pane" id="tabTemplateHidden" style="display: none;">
                    </div>
                </div>
            </main>
        </div>
        <footer class="app-footer">

            <span slot-status=""><a class="ng-tns-c0-0"
                    href="http://serprodesign.estaleiro.serpro/showcase/#">ComCom</a></span>
            <span class="ml-auto">
                <span slot-version="">Versão <span id="version-number">1.0.0</span></span>
            </span>

        </footer>
    </div>
</template>
<script>
import AppHeader from "./AppHeader.vue";
export default {
    name: "HomePage",
    components: {
        AppHeader
    },
    methods: {
        pega() {
            try {
                fetch("http://localhost:8080/ComCom/diope/comcom/api/comunicacao/62e3eee94c012dd283455d70/true", {
                    method: "PUT",
                    body: "Gostei demais!. Seria muito bom receber mais comunicações deste tipo.",
                    headers: new Headers({ "content-type": "application/json" }),
                }).then(data => { return data; }).catch(e => {
                    console.log(e);
                    return "Catch: " + e;
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    },
}
</script>
<style>

</style>