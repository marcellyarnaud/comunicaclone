<template>
    <div>
        <div class="container-fluid">
            <b-card>
                <b-row>
                    <b-col sm="8">
                        <h1 class="heading h3 mb-3">Comunicações</h1>
                    </b-col>
                    <b-col sm="4" class="title-button">
                        <div class="text-right">
                            <b-button class="sd btn right icon btn-primary" id="btnNovaComunicacao" type="button"
                                @click="cadastrarNovaComunicacao()">
                                <span class="fa fa-plus" aria-hidden="true"></span>
                                Cadastrar Nova Comunicação
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <b-form id="frmFiltroComunicacao" class="container-fluid" @submit="onSubmit" @reset="onReset">
            <b-card>
                <b-card-header>
                    <b-row class="justify-content-between">
                        <b-col class="col-auto">
                            <h4 class="">Filtro</h4>
                        </b-col>
                        <b-col class="col-auto">
                            <b-button
                                :class="visible ? 'btn btn-sm btn-circle-inverted-primary' : 'btn btn-sm btn-circle-inverted-primary collapsed'"
                                :aria-expanded="visible ? 'true' : 'false'" aria-controls="collapse-Filtro"
                                @click="visible = !visible">
                                <span v-show="!visible">
                                    <i class="fas fa-chevron-down"></i>
                                </span>
                                <span v-show="visible">
                                    <i class="fas fa-chevron-up"></i>
                                </span>
                            </b-button>
                        </b-col>
                    </b-row>
                </b-card-header>
                <b-collapse id="collapse-Filtro" v-model="visible" class="mt-2">
                    <b-card-body>
                        <b-row>
                            <b-col sm="3">
                                <b-form-group label="Título" label-for="titulo">
                                    <b-form-input id="titulo" class="form-control" type="text" maxlength="64"
                                        v-model="titulo"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="6">
                                <b-form-group label="Resumo" label-for="resumo">
                                    <b-form-input id="resumo" class="orm-control" type="text" maxlength="256"
                                        v-model="resumo"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="3">
                                <b-form-group label="Estado" label-for="acao">
                                    <b-form-select id="acao" class="orm-control" v-model="selectedEstado"
                                        :options="optionsEstado"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3">
                                <b-form-group label="Data Inicial" label-for="dataInicio">
                                    <b-form-datepicker id="dataInicio" locale="pt-BR" placeholder="Escolha uma data"
                                        v-model="dataInicio" value-as-date
                                        :date-format-options="{ weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' }"
                                        today-button close-button right></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                            <b-col sm="3">
                                <b-form-group label="Data Final" label-for="dataFim">
                                    <b-form-datepicker id="dataFim" locale="pt-BR" placeholder="Escolha uma data"
                                        v-model="dataFim" value-as-date
                                        :date-format-options="{ weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' }"
                                        today-button close-button dropright></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-card-body>
                    <b-card-footer>
                        <b-row class="float-right my-3 mr-3 my-2">
                            <b-col>
                                <b-button type="submit" variant="primary">Filtrar</b-button>
                            </b-col>
                            <b-col>
                                <b-button type="reset" variant="secondary" id="limpar">Limpar</b-button>
                            </b-col>
                        </b-row>
                    </b-card-footer>
                </b-collapse>
            </b-card>
            <b-card>
                <b-card-body :hidden="comunicacoesStore.index < 0">
                    <b-table striped responsive hover :busy="isBusy" :items="tableRows" :fields="comunicacoesFields">
                        <template #table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Carregando...</strong>
                            </div>
                        </template>
                        <template #cell(acoes)="data">
                            <span v-html="data.value"></span>
                        </template>
                    </b-table>
                </b-card-body>
            </b-card>
        </b-form>
    </div>
</template>
<script>
import { notificationMessages } from "../../mixins/notificationMessages";
import { storesCommon } from "../../mixins/storesCommon";

export default {
    name: "FrontPage",
    mixins: [notificationMessages, storesCommon],
    data() {
        return {
            isBusy: false,
            visible: true,
            selectedEstado: null,
            dataInicio: null,
            dataFim: null,
            titulo: null,
            resumo: null,
            comunicacoesFields: [
                {
                    key: 'titulo',
                    label: 'Título',
                    sortable: true
                },
                {
                    key: 'resumo',
                    sortable: false
                },
                {
                    key: 'acao',
                    label: 'Estado',
                    sortable: true,
                },
                {
                    key: 'acoes',
                    label: 'Ações',
                    sortable: false,
                    variant: 'info'
                },
            ]
        }
    },
    computed: {
        btnToggleCaption() {
            return this.visible ? "Recolher" : "Expandir";
        },
        optionsEstado() {
            return this.definicoesStore.textValue(this.definicoesStore.eventos);
        },
        tableRows() {
            if (this.comunicacoesStore.index < 0) {
                return [];
            }
            let resultado = this.comunicacoesStore.listaComunicacoes.map(
                (element) => {
                    return {
                        ...element,
                        'acoes': '<a href="http://www.serpro.gov.br/">Análise Impacto</a>'
                    }
                }
            );
            return resultado;
        }
    },
    mounted() {
        this.definicoesStore.reloadAll();
        this.carregaListaComunicacoes();
    },
    methods: {
        carregaListaComunicacoes() {
            this.isBusy = true;
            this.comunicacoesStore.list(
                'titulo:resumo:acao',
                undefined,
                {
                    'startDate': this.dataInicio,
                    'endDate': this.dataFim,
                    'status': this.selectedEstado,
                    'titulo': this.titulo,
                    'resumo': this.resumo
                }).then(() => {
                    this.isBusy = false;
                });
        },
        cadastrarNovaComunicacao() {
            console.log('Cadastrando nova comunicação!');
        },
        onSubmit(event) {
            event.preventDefault();
            this.carregaListaComunicacoes();
        },
        onReset() {
            this.dataInicio = null;
            this.dataFim = null;
            this.titulo = '';
            this.resumo = '';
            this.selectedEstado = null;

            this.carregaListaComunicacoes();
        }
    }
}
</script>
<style>
/* Busy table styling */
table.b-table[aria-busy='true'] {
    opacity: 0.6;
}
</style>