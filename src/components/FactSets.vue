<template>
    <div>
        <b-row class="m-lg-1 form-group">
            <b-col>
                <label for="tabelaFactSet"><em>*</em> {{ oQue }}</label>
                <b-table ref="tabelaFactSet" striped responsive hover sticky-header
                    :items="factSetsRows()" :fields="factSetsFields">
                    <template #cell(acoes)="data">
                        <div v-for="item in data.value">
                            <b-button pill size="sm" variant="success" @click="onClickAcao(item.id, item.acao)">
                                {{ item.text }}
                            </b-button>
                        </div>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row class="m-lg-1 form-group">
            <b-col>
                <b-button class="sd btn right icon btn-primary" type="button" @click="adicionarFactSet()">
                    <span class="fa fa-plus" aria-hidden="true"></span>
                    Adicionar
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "FactSets",
    props: {
        oQue: String,
        factSets: Array
    },
    data() {
        return {
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
    methods:    {
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
                                'text': 'Editar'
                            },
                            {
                                'acao': 'excluirFactSet()',
                                'id': index,
                                'text': 'Excluir'
                            }
                        ]
                    }
                }
            );
            return resultado;
        },

        // Eventos factSet
        async onClickAcao(id, acao) {
            console.log('id: ' + id);
            eval('this.' + acao);
        },
        adicionarFactSet() {
            console.log('Adicionando factSet');
        },
        editarFactSet() {
            //this.$refs.modalEditComunicacao.show(this.comunicacaoSelecionada);
            console.log('Editando factSet');
        },
        excluirFactSet() {
            console.log('Excluindo factSet');
        },
    }
}
</script>

<style scoped>

</style>