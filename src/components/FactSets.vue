<template>
    <div>
        <b-row class="m-lg-1 form-group">
            <b-col>
                <label for="tabelaFactSet"><em>*</em> {{ oQue }}</label>
                <b-table ref="tabelaFactSet" striped responsive hover sticky-header :items="factSetsRows()"
                    :fields="factSetsFields">
                    <template #cell(acoes)="data">
                        <div v-for="item in data.value">
                            <b-button pill size="sm" variant="success" @click="onClickAcao(item.id, item.acao, item.labelAcao)">
                                {{ item.text }}
                            </b-button>
                        </div>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row class="m-lg-1 form-group">
            <b-col>
                <b-button class="sd btn right icon btn-primary" type="button" @click="onClickAcao(null, 'adicionarFactSet()', 'Incluir')">
                    <span class="fa fa-plus" aria-hidden="true"></span>
                    Adicionar
                </b-button>
            </b-col>
        </b-row>
        <div class="bv-modal">
            <KeyValue ref="keyValue" label-key="Título" label-value="Conteúdo" :label-ok="labelAcao"
                :titulo="titulo" place-holder-key="Digite a descrição do título" :modal-id="refPrefix"
                place-holder-value="Digite o conteúdo" @modalClosed="modalClosed" />
        </div>
    </div>
</template>

<script>
import KeyValue from '../pages/modal/KeyValue.vue';

export default {
    name: "FactSets",
    components: {
        KeyValue
    },
    props: {
        oQue: String,
        titulo: String,
        refPrefix: String,
        factSets: Array
    },
    data() {
        return {
            factSetSelected: [],
            labelAcao: '',

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
    methods: {
        factSetsRows() {
            if (this.factSets.length < 1) {
                return [];
            }
            let resultado = this.factSets.map(
                (element, index) => {
                    return {
                        ...element,
                        'acoes': [
                            {
                                'acao': 'editarFactSet()',
                                'id': index,
                                'text': 'Editar',
                                'labelAcao': 'Modificar'
                            },
                            {
                                'acao': 'excluirFactSet()',
                                'id': index,
                                'text': 'Excluir',
                                'labelAcao': null
                            }
                        ]
                    }
                }
            );
            return resultado;
        },

        // Eventos factSet
        onClickAcao(id, acao, labelAcao) {
            console.log('id: ' + id);
            this.factSetSelected = this.factSets[id];
            this.labelAcao = labelAcao;
            console.log('factSetSelecionado: ' + JSON.stringify(this.factSetSelected));
            console.log('this.' + acao);
            eval('this.' + acao);
        },
        adicionarFactSet() {
            console.log('Adicionando factSet');
            this.factSetSelected = [];
            this.labelAcao = 'Incluir';
            this.$refs.keyValue.show(this.factSetSelected);
        },
        editarFactSet() {
            console.log('Editando factSet');
            this.$refs.keyValue.show(this.factSetSelected);
        },
        excluirFactSet() {
            console.log('Excluindo factSet');
        },
        modalClosed()   {
            console.log('modalClosed was called');
        }
    }
}
</script>

<style scoped>

</style>