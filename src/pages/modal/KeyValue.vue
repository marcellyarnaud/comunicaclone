<template>
    <div>
        <b-modal id="keyValueModal" :title="titulo" size="lg" ok-title="Salvar" @ok="onSubmit" :cancel-title="labelCancel"
            no-close-on-backdrop>
            <b-form id="frmKeyValue">
                <b-container fluid>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <label for="key"><em>*</em> {{ labelKey }}</label>
                            <b-form-input id="key" v-model="key" :placeholder="placeHolderKey"
                                :aria-label="labelKey" aria-required="true" :max=keyMax></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="m-lg-1 form-group">
                        <b-col>
                            <label for="value"><em>*</em> {{ labelValue }}</label>
                            <b-form-input id="value" v-model="value" :placeholder="placeHolderValue"
                                :aria-label="labelValue" aria-required="true" :max=valueMax></b-form-input>
                        </b-col>
                    </b-row>
                </b-container>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'KeyValue',
    props: {
        titulo: String,
        labelOk: {
            type: String,
            default: 'Salvar'
        },
        labelCancel: {
            type: String,
            default: 'Fechar'
        },
        labelKey:   {
            type: String,
            default: 'Chave'
        },
        labelValue: {
            type: String,
            default: 'Valor'
        },
        placeHolderKey:   {
            type: String,
            default: 'Digite um nome'
        },
        placeHolderValue: {
            type: String,
            default: 'Digite um valor'
        },
        keyMax: {
            type: Number,
            default: 64
        },
        valueMax: {
            type: Number,
            default: 64
        }
    },
    data()  {
        return {
            key: '',
            value: ''
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            console.log('Ok KeyValueModal');
            this.$nextTick(() => {
                this.$bvModal.hide('keyValueModal');
            });
        },
        onReset() {
        },
        show(fs) {
            let values = Object.values(fs);
            this.key = (values[0] != null ? values[0] : '');
            this.value = (values[1] != null ? values[1] : '');
            console.log(this.key);
            console.log(this.value);
            this.$forceUpdate();
            this.$bvModal.show('keyValueModal');
        },
    }
}
</script>

<style>

</style>