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
                            <b-form-textarea id="detalhes" v-model="detalhes" :state="detalhes.length >= 100"
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
import { INFO, notificationMessages } from "../../mixins/notificationMessages";
import { storesCommon } from "../../mixins/storesCommon";
import * as errorUtils from "../../errors/ErrorsUtils";

export default {
    name: "EditComunicao",
    mixins: [notificationMessages, storesCommon],
    props: {
        selecionadaId: null,
    },
    data() {
        return {
            id: null,
            titulo: '',
            resumo: '',
            adicionarReacao: false,
            detalhes: '',
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
            return this.maxLenghtDetalhe - this.detalhes.length;
        },
        btnToggleCaption() {
            return this.visible ? "Recolher" : "Expandir";
        },
        tableRows() {
            if (this.comunicacoesStore.index < 0) {
                return [];
            }
            let resultado = this.comunicacoesStore.listaComunicacoes.map(
                (element) => {
                    return {
                        ...element,
                        'acoes': ['ovo', 'carne']
                    }
                }
            );
            return resultado;
        }
    },
    mounted() {
        //this.carregaComunicacao();
    },
    methods: {
        carregaComunicacao() {
            let comunicacao = this.comunicacoesStore.get(this.id);
            if (comunicacao == null) {
                errorUtils.treatWarning('Falha ao buscar comunicação', 'Comunicação selecionada não existe na lista de comunicações.');
            } else {
                this.data = comunicacao;
            }
        },
        onSubmit(event) {
            event.preventDefault();
            this.comunicacoesStore.update(this.data);
        },
        onReset() {
            this.data = null;

        },
        show() {
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