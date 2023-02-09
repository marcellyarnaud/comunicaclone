<template>
    <div>
        <b-modal id="editComunicacaoModal" title="Comunicação" size="lg" ok-title="Salvar" @ok="onSubmit"
            cancel-title="Fechar" no-close-on-backdrop>
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
                            <JoditHTML :html="detalhe" />
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <label for="tabelaCabecalho"><em>*</em> Cabeçalhos</label>
                            <b-table ref="tabelaCabecalho" striped responsive hover sticky-header
                                :items="factSetsRows(cabecalho, 'editarCabecalho()', 'excluirCabecalho()')"
                                :fields="factSetsFields">
                                <template #cell(acoes)="data">
                                    <div v-for="item in data.value">
                                        <b-button pill size="sm" variant="success"
                                            @click="onClickAcao(item.id, item.acao)">
                                            {{ item.text }}
                                        </b-button>
                                    </div>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <b-button class="sd btn right icon btn-primary" type="button" @click="criarCabecalho()">
                                <span class="fa fa-plus" aria-hidden="true"></span>
                                Adicionar
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <label for="tabelaRodape"><em>*</em> Rodapés</label>
                            <b-table ref="tabelaRodape" striped responsive hover sticky-header
                                :items="factSetsRows(rodape, 'editarRodape()', 'excluirRodape()')" :fields="factSetsFields">
                                <template #cell(acoes)="data">
                                    <div v-for="item in data.value">
                                        <b-button pill size="sm" variant="success"
                                            @click="onClickAcao(item.id, item.acao)">
                                            {{ item.text }}
                                        </b-button>
                                    </div>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <b-button class="sd btn right icon btn-primary" type="button" @click="criarRodape()">
                                <span class="fa fa-plus" aria-hidden="true"></span>
                                Adicionar
                            </b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
import { notificationMessages } from "../../mixins/notificationMessages";
import { storesCommon } from "../../mixins/storesCommon";
import * as errorUtils from "../../errors/ErrorsUtils";
import JoditHTML from "../../components/JoditHTML.vue";

export default {
    name: "EditComunicao",
    mixins: [notificationMessages, storesCommon],
    components: {
        JoditHTML
    },
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

            // FactSets Fields
            factSetsFields: [
                {
                    key: 'title',
                    label: 'Título',
                    sortable: true
                },
                {
                    key: 'value',
                    label: 'Conteúdo',
                    sortable: true,
                },
                {
                    key: 'acoes',
                    label: 'Ações',
                    sortable: false,
                    variant: 'info'
                },
            ],
        }
    },
    computed: {
        caracteresRestantesResumo() {
            return this.maxLengthResumo - this.resumo.length;
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            console.log(this.editStore.html);
            this.$nextTick(() => {
                this.$bvModal.hide('editComunicacaoModal');
            });
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
            this.$bvModal.show('editComunicacaoModal');
        },
        factSetsRows(factset, editar, excluir) {
            if (factset.length < 1) {
                return [];
            }
            let resultado = factset.map(
                (element, index) => {
                    return {
                        ...element,
                        'acoes': [
                            {
                                'acao': editar,
                                'id': index,
                                'text': 'Editar'
                            },
                            {
                                'acao': excluir,
                                'id': index,
                                'text': 'Excluir'
                            }
                        ]
                    }
                }
            );
            return resultado;
        },

        // Eventos cabeçalhos e rodapés
        async onClickAcao(id, acao) {
            console.log('id: ' + id);
            eval('this.' + acao);
        },
        criarCabecalho() {
            console.log('Criando cabeçalho');
        },
        editarCabecalho() {
            //this.$refs.modalEditComunicacao.show(this.comunicacaoSelecionada);
            console.log('Editando cabeçalho');
        },
        excluirCabecalho() {
            console.log('Excluindo cabeçalho');
        },
    }
}
</script>
<style>
.modal-lg {
    max-width: auto !important;
    min-width: 90% !important;
}
</style>