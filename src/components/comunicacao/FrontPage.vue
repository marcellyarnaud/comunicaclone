<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-8">
                    <h1 class="heading h3 mb-3">Comunicações</h1>
                </div>
                <div class="title-button col-sm-4">
                    <div class="text-right">
                        <b-button class="sd btn right icon btn-primary" id="btnNovaComunicacao" type="button"
                            @click="cadastrarNovaComunicacao()">
                            <span class="fa fa-plus" aria-hidden="true"></span>
                            Cadastrar Nova Comunicação
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <b-form id="frmFiltroComunicacao" class="card" @submit="onSubmit" @reset="onReset">
                <div class="card-header">
                    <div class="row justify-content-between">
                        <div class="col-auto">
                            <h4 class="">Filtro</h4>
                        </div>
                        <div class="col-auto">
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
                        </div>
                    </div>
                </div>
                <b-collapse id="collapse-Filtro" v-model="visible" class="mt-2">
                    <b-card>
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
                            <div class="float-right my-3 mr-3 my-2">
                                <b-button type="submit" variant="primary">Filtrar</b-button>
                                <b-button type="reset" variant="secondary" id="limpar">Limpar</b-button>
                            </div>
                        </b-card-footer>
                    </b-card>
                </b-collapse>
            </b-form>
            <b-card>
                <b-card-body id="tabelaComunicacao"></b-card-body>
            </b-card>
        </div>
    </div>
</template>
<script>
export default {
    name: "FrontPage",
    props: {

    },
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
            ]
        }
    },
    computed: {
        btnToggleCaption() {
            return this.visible ? "Recolher" : "Expandir";
        }
    },
    methods: {
        cadastrarNovaComunicacao() {
            console.log('Cadastrando nova comunicação!');
        },
        onSubmit() {
            console.log('Filtrando');
            console.log(this.$data);
        },
        onReset() {
            console.log('Limpando campos');
        }
    }
}
</script>
<style>

</style>