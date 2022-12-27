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
                                        :options="options"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3">
                                <b-form-group label="Data Inicial" label-for="dataInicio">
                                    <b-form-datepicker id="dataInicio" locale="pt-BR" placeholder="Escolha uma data"
                                        v-model="dataInicio"
                                        :date-format-options="{ weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' }"
                                        today-button close-button right></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                            <b-col sm="3">
                                <b-form-group label="Data Final" label-for="dataFim">
                                    <b-form-datepicker id="dataFim" locale="pt-BR" placeholder="Escolha uma data"
                                        v-model="dataFim"
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
                <b-card-body>
                    <b-table striped responsive hover :items="tableRows" :fields="comunicacoesFields"></b-table>
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
            visible: true,
            selectedEstado: null,
            dataInicio: null,
            dataFim: null,
            titulo: null,
            resumo: null,
            options: [
                { value: null, text: 'Please select an option' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option', disabled: true },
                {
                    label: 'Grouped options',
                    options: [
                        { value: { C: '3PO' }, text: 'Option with object value' },
                        { value: { R: '2D2' }, text: 'Another option with object value' }
                    ]
                }
            ],
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
            ],

        }
    },
    computed: {
        btnToggleCaption() {
            return this.visible ? "Recolher" : "Expandir";
        },
        tableRows() {
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
    methods: {
        cadastrarNovaComunicacao() {
            console.log('Cadastrando nova comunicação!');
        },
        onSubmit(event) {
            event.preventDefault();
            console.log('Filtrando');
            console.log(this.$data);
            this.comunicacoesStore.list();
            console.log('Resultado lista:');
            console.log(this.comunicacoesStore.listaComunicacoes);
        },
        onReset() {
            console.log('Limpando campos');
            this.notify('Eu que fiz', 'Problemas', 'i');
        }
    }
}
</script>
<style>

</style>