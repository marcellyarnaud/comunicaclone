<template>
    <div>
      <BTable
        :id="$genereteId('list', field)"
        :items="items"
        :fields="styledFields"
        :busy="isLoading"
        :per-page="perPage"
        :current-page="currentPage"
        striped
        hover
        stacked="md"
        responsive
        show-empty
        empty-text="Nenhum item encontrado"
        empty-filtered-text="Nenhum item encontrado na pesquisa"
        class="base-list-table"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template #table-busy>
          <div class="text-center my-4">
            <BSpinner class="align-middle" />
            <strong>Carregando...</strong>
          </div>
        </template>
        <!--
          o código a seguir puxa os slots dos componentes ancestrais e os aplica na
          bootstrap-vue table, é uma forma de evitar ter de declarar os mesmo slots em
          toda hierarquia de componentes que usar BaseList. mais detalhes na resposta
          abaixo:
          https://stackoverflow.com/questions/50891858/vue-how-to-pass-down-slots-inside-wrapper-component?rq=1
        -->
        <template
          v-for="(_, slot) of $scopedSlots"
          #[slot]="scope"
        >
          <slot
            :name="slot"
            v-bind="scope"
          />
        </template>
      </BTable>
  
      <BPagination
        v-if="items.length > perPage"
        :id="$genereteId('pagination', field)"
        v-model="currentPage"
        :total-rows="items.length"
        :per-page="perPage"
        :aria-controls="$genereteId('pagination', field)"
        first-number
        last-number
        align="center"
      />
    </div>
  </template>
  
  <script>
  import { BTable, BSpinner, BPagination } from '../bv';
  
  export default {
    name: 'BaseTable',
    components: { BTable, BSpinner, BPagination },
    props: {
      field: {
        type: String,
        required: true
      },
      fields: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        perPage: 10,
        currentPage: 1
      };
    },
    computed: {
      styledFields () {
        const fieldHasStyle = field => field.minSize || field.centerTitle;
  
        return this.fields.map(f => ({
          ...f,
          ...f.label && { label: f.label.toUpperCase() },
          ...fieldHasStyle(f) && {
            thStyle: {
              ...f.minSize && { width: '1px' },
              ...f.centerTitle && { 'text-align': 'center' }
            }
          }
        }));
      }
    }
  };
  
  </script>
  
  <style scoped>
    .base-list-table::v-deep th,
    .base-list-table::v-deep .b-table-stacked-md tr [data-label]::before {
      color: var(--serpro-primary);
      font-size: var(--font-size-200);
      font-weight: var(--font-weight-normal) !important;
    }
  
    @media (max-width: 768px) {
      .base-list-table::v-deep .b-table-stacked-md td {
        display: flex !important;
        align-items: center;
      }
    }
  </style>
  