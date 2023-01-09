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
                    <b-modal id="modal-erro-certificado" ref="modal-erro-certificado" title="Erro de certificado"
                        hideFooter>
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
            </div>
        </main>
    </div>
</template>
<script>
import * as utils from '../utils/field-formatters';
import * as sso from '../utils/sso';
import { ERROR, notificationMessages, WARNING } from '../mixins/notificationMessages';
import { storesCommon } from '../mixins/storesCommon';
import { HttpStatusCode } from 'axios';

export default {
    name: "LoginPage",
    mixins: [notificationMessages, storesCommon],
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            passwordFieldType: "password",
            show: true,
            escondeModalErroCertificado: false,
        }
    },
    computed: {
        isValidCPF() {
            return (this && this.form && this.form.username) ? utils.validaCPF(this.form.username) : false;
        },
        isLoggedIn() {
            return this.isValidCPF();
        }
    },
    methods: {
        formataCPF(valor) {
            return utils.formataCPF(valor);
        },
        mostrarOcultarSenha() {
            this.passwordFieldType = (this.passwordFieldType === "password") ? "text" : "password";
        },
        onSubmit(event) {
            /*
                        this.usuariosStore.token = {
                            "string": "AP8NfpvzVFVacIfQckx2WWxGsnylpt",
                            "used_at": null,
                            "created_at": 1670347467
                        };
                        this.usuariosStore.user = {
                            "cpf": "75814943653",
                            "nome": "Lucas Martins do Amaral",
                            "email": "lucas.amaral@serpro.gov.br",
                            "conexao": "SERPRO"
                        };
                        this.usuariosStore.perfil = 'Administrador';
                        this.$router.push({ name: 'frontPage' }, () => { console.debug('Ok') }, (e) => { console.debug('Error: ' + e) });
            */
            console.log('OnSubmit: ' + utils.removeNonDigits(this.form.username));
            event.preventDefault();
            sso.login(utils.removeNonDigits(this.form.username), this.form.password)
                .then((response) => {
                    console.log('SSO Login: ' + response.status);
                    if (response.status == HttpStatusCode.Ok) {
                        this.usuariosStore.token = response.data.token;
                        this.usuariosStore.user = response.data.user;
                        this.usuariosStore.perfil = 'Administrador';
                        this.usuariosStore.loggedIn();

                        this.$router.push({ name: 'frontPage' }, () => { console.debug('Ok') }, (e) => { console.debug('Error: ' + e) });
                    }
                }).catch((error) => {
                    console.log("Erro durante login: " + error);
                    if (error.code == "ERR_NETWORK") {
                        this.$refs['modal-erro-certificado'].show();
                    } else {
                        this.notify('Erro login', error.message, ERROR);
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