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

                <div class="tab-pane" id="tabTemplateLogin">
                    <b-modal id="modal-erro-certificado" title="Erro de certificado" hideFooter>
                        <p>Certificado não cadastrado.<br />
                            Clique no botão <b>Aceitar Certificado</b> abaixo
                            para cadastrar e, em seguida, tente logar novamente.
                            <br />
                            <br />
                            Se o erro persistir, tente logar com seu CPF e Senha ou utilize outro navegador (Firefox
                            ou Internet Explorer).
                        </p>
                        <b-button variant="outline-primary" href="https://sso.supop.serpro/cadastro_certificado"
                            target="_blank">Aceitar Certificado</b-button>
                        <b-button class="mt-3" block @click="$bvModal.hide('modal-erro-certificado')">Fechar</b-button>
                    </b-modal>
                    <div class="page-auth">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-5 d-none d-sm-block bg-login-unico2">
                                </div>
                                <div id="semtextocv1" class="col-sm-7 bg-edit">
                                    <div class="app flex-row">
                                        <div class="container py-4">
                                            <div class="text-right mb-5">
                                                <img class="logoSerpro" src="../assets/images/logo-serpro-2021.jpg">
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


                                                <b-form id="frmLogin" @submit="onSubmit" @reset="onReset" v-if="show">
                                                    <b-form-group id="input-group-login" label="CPF:"
                                                        label-for="inputCPF">
                                                        <b-form-input id="inputCPF" v-model="form.username" type="text"
                                                            aria-label="CPF" aria-required="true" autofocus
                                                            placeholder="Insira seu CPF" required :state="isValidCPF"
                                                            trim :formatter="formataCPF"
                                                            aria-describedby="input-cpf-live-help input-cpf-live-feedback">
                                                        </b-form-input>
                                                        <b-form-invalid-feedback id="input-cpf-live-feedback">
                                                            Digite CPF válido (somente dígitos, máximo 11 dígitos)
                                                        </b-form-invalid-feedback>
                                                        <b-form-text id="input-cpf-live-help">
                                                            Identificação do usuário com CPF
                                                        </b-form-text>
                                                    </b-form-group>
                                                    <b-form-group label-for="input-password" label="Senha:">
                                                        <b-input-group class="mt-3">
                                                            <b-form-input :type="passwordFieldType" id="input-password"
                                                                aria-describedby="password-help-block"
                                                                v-model="form.password"></b-form-input>
                                                            <template #append>
                                                                <b-button class="btn btn-secondary px-2"
                                                                    id="button-addon2" title="mostrar/ocultar senha"
                                                                    type="button" @click="mostrarOcultarSenha()">
                                                                    <i id="viewPasswd" aria-hidden="true"
                                                                        class="fas fa-eye"></i>
                                                                </b-button>
                                                            </template>
                                                        </b-input-group>
                                                        <b-form-text id="password-help-block">
                                                            Não divulgue sua senha para ninguém. Consulte a norma
                                                            específica.
                                                        </b-form-text>
                                                    </b-form-group>

                                                    <p class="mb-5">
                                                    </p>

                                                    <b-button type="submit" variant="primary">Entrar</b-button>
                                                    <b-button type="reset" variant="danger">Limpar</b-button>
                                                </b-form>
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
</template>
<script>
import axios from "axios";
import * as utils from "../utils/field-formatters.js";
import * as sso from "../utils/sso.js";
import { userSession } from "../stores/userSession.js";

export default {
    name: "LoginPage",
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            passwordFieldType: "password",
            show: true,
            escondeModalErroCertificado: false,
            store: userSession()
        }
    },
    computed: {
        isValidCPF() {
            return (this && this.form && this.form.username) ? utils.validaCPF(this.form.username) : false;
        },
        isLoggedIn() {
            return this.isValidCPF;
        },
        username() {
            console.log(JSON.stringify(this.store));
            return 'sem store';
        }
    },
    methods: {
        formataCPF(valor)   {
            return valor;//utils.formataCPF(valor);
        },
        mostrarOcultarSenha() {
            this.passwordFieldType = (this.passwordFieldType === "password") ? "text" : "password";
        },
        pega() {
            try {
                axios(
                    {
                        method: 'put',
                        url: 'http://localhost:8080/ComCom/diope/comcom/api/comunicacao/62e3eee94c012dd283455d70/true',
                        body: 'Gostei demais!. Seria muito bom receber mais comunicações deste tipo.',
                        headers: new Headers({ "content-type": "application/json" })
                    }
                ).then((response) => {
                    console.log(response);
                }
                ).catch((error) => {
                    console.log(error);
                });

                /*
                fetch("http://localhost:8080/ComCom/diope/comcom/api/comunicacao/62e3eee94c012dd283455d70/true", {
                    method: "PUT",
                    body: "Gostei demais!. Seria muito bom receber mais comunicações deste tipo.",
                    headers: new Headers({ "content-type": "application/json" }),
                }).then(data => { return data; }).catch(e => {
                    console.log(e);
                    return "Catch: " + e;
                });
                */
            }
            catch (e) {
                console.log(e);
            }
        },
        onSubmit(event) {
            console.log('OnSubmit: ' + this.form.username);
            event.preventDefault();
            sso.login(this.form.username, this.form.password)
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        this.store.token = response.data.token;
                        this.store.user = response.data.user;
                        this.store.perfil = 'Administrador';
                        //console.log(JSON.stringify(this.store, null, "\t"));
                        //console.log('Current: ' + this.$route.path);
                        this.$router.push({ name: 'frontPage' }, () => { console.debug('Ok') }, (e) => { console.debug('Error: ' + e) });
                    }
                }).catch((error) => {
                    console.log("Erro durante login: " + error);
                    if (error.code == "ERR_NETWORK") {
                        this.$refs['modal-erro-certificado'].show();
                    }
                });
        },
        onReset(event) {
            event.preventDefault();
            // Reset our form values
            this.form.username = '';
            this.form.password = '';
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        }
    },
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