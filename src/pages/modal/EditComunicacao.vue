<template>
    <div>
        <b-modal id="my-modal" title="Comunicação" size="lg" ok-title="Salvar" cancel-title="Fechar"
            no-close-on-backdrop>
            <b-form id="frmModalCadastro">
                <b-container fluid>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <label for="titulo"><em>*</em> Título</label>
                            <b-form-input id="titulo" v-model="titulo" placeholder="Qual o título da comunicação?"
                                aria-label="Título" aria-required="true" max="64"></b-form-input>
                        </b-col>
                        <b-col class="col-sm-4 pt-4">
                            <b-form-checkbox id="adicionarReacao" v-model="adicionarReacao" name="adicionarReacao"
                                aria-label="Adicionar campos de reação">
                                Adicionar campos de reação
                            </b-form-checkbox>
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <label for="resumo"><em>*</em> Resumo</label>
                            <b-form-textarea id="resumo" v-model="resumo" :state="resumo.length >= 30"
                                :maxlength="maxLengthResumo" placeholder="Digite no mínimo 30 caracteres" rows="6"
                                no-resize></b-form-textarea>
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <div>Caracteres restantes: {{ caracteresRestantesResumo }}</div>
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <label for="detalhes"><em>*</em> Detalhes (HTML)</label>
                            <b-form-textarea id="detalhes" v-model="detalhe" :state="detalhe.length >= 100"
                                :maxlength="maxLenghtDetalhe" placeholder="Digite no mínimo 100 caracteres" rows="16"
                                no-resize></b-form-textarea>
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <div>Caracteres restantes: {{ caracteresRestantesDetalhe }}</div>
                        </b-col>
                    </b-row>
                    <div id="tabelaCabecalho"></div>
                    <div id="tabelaFactSet"></div>
                </b-container>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
import { notificationMessages } from "../../mixins/notificationMessages";
import { storesCommon } from "../../mixins/storesCommon";
import * as errorUtils from "../../errors/ErrorsUtils";

export default {
    name: "EditComunicao",
    mixins: [notificationMessages, storesCommon],
    data() {
        return {
            id: null,
            titulo: '',
            resumo: '',
            adicionarReacao: false,
            detalhe: '',
            cabecalho: [
                {
                    titulo: null,
                    conteudo: null
                }
            ],
            rodape: [
                {
                    titulo: null,
                    conteudo: null
                }
            ],
            maxLengthResumo: 512,
            maxLenghtDetalhe: 8192
        }
    },
    computed: {
        caracteresRestantesResumo() {
            return this.maxLengthResumo - this.resumo.length;
        },
        caracteresRestantesDetalhe() {
            return this.maxLenghtDetalhe - this.detalhe.length;
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
        },
        onReset() {
        },
        show(comunicacao) {
            if (comunicacao != null) {
                this.id = comunicacao.id;
                this.titulo = comunicacao.titulo;
                this.resumo = comunicacao.resumo;
                this.adicionarReacao = comunicacao.adicionarReacao;
                this.detalhe = comunicacao.detalhe;
                this.cabecalho = comunicacao.cabecalho;
                this.rodape = comunicacao.rodape;
            } else {
                this.id = null;
                this.titulo = '';
                this.resumo = '';
                this.adicionarReacao = false;
                this.detalhe = '';
                this.cabecalho = [
                    {
                        titulo: null,
                        conteudo: null
                    }
                ];
                this.rodape = [
                    {
                        titulo: null,
                        conteudo: null
                    }
                ];
            }
            this.$bvModal.show('my-modal');
        }
    }
}
</script>
<style>
.modal-lg {
    max-width: auto !important;
    min-width: 90% !important;
}
</style>