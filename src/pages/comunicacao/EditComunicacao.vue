<template>
    <div>
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="modalCadastroTitle">Comunicação</h4>
            </div>
            <b-form id="frmModalCadastro">
                <div class="modal-body">
                    <input id="acao" type="hidden" value="ESCRITA">
                    <div class="separador-base">
                        <div class="row">
                            <div id="titulo" class="dynamic-field col-sm-8" data-input-type="text" aria-label="Título"
                                aria-required="true" data-rows="64"></div>
                            <div id="adicionarReacao" class="dynamic-field col-sm-4 pt-4" data-input-type="check"
                                aria-label="Adicionar campos de reação"></div>
                        </div>
                        <div id="resumo" class="dynamic-field" data-input-type="memo" aria-label="Resumo"
                            aria-required="true" data-max-length="512"></div>
                        <div id="detalhe-group" class="form-group">
                            <label for="detalhe"><em>*</em> Detalhes (HTML)</label>
                            <div id="editorHTML"></div>
                            <span>Caracteres restantes: <span id="detalhe_chars">5000</span></span>
                            <div id="detalhe-message" class="label">
                            </div>
                        </div>
                        <div id="tabelaCabecalho"></div>
                        <div id="tabelaFactSet"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button id="btnSalvar" type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </b-form>
        </div>
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
        selecionadaId: null
    },
    data() {
        return {
            id: null,
            titulo: null,
            resumo: null,
            adicionarReacao: false,
            detalhes: null,
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
            ]
        }
    },
    computed: {
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
        this.carregaComunicacao()
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
            
        }
    }
}
</script>
<style>

</style>