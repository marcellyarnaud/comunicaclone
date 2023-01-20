<template>
    <div>
      <!--
      <PowerSearch
        v-model="searchedItems"
        :config="searchConfig"
        :all-items="items"
        class="mt-2"
      />
      -->
      <Row class="mt-2">
        <Col>
          <BaseTable
            :field="field"
            :items="searchedItems"
            :fields="enhancedFields"
            :is-loading="isLoading"
            v-bind="$attrs"
            v-on="$listeners"
            @row-dblclicked="handleEdit"
          >
            <template #cell(enum)="data">
              <AppIcon
                v-if="chooseEnumColor(data.item)"
                name="circle"
                :variant="chooseEnumColor(data.item)"
              />
            </template>
            <template #cell(actions)="data">
              <div class="d-flex flex-nowrap">
                <ActionIcon
                  v-if="canView(data.item)"
                  :field="$genereteId('view', field, data.index)"
                  icon="view"
                  tooltip="visualizar"
                  @click="handleView(data.item)"
                />
                <ActionIcon
                  v-if="canEdit(data.item)"
                  :field="$genereteId('edit', field, data.index)"
                  icon="edit"
                  tooltip="editar"
                  @click="handleEdit(data.item)"
                />
                <ActionIcon
                  v-if="canDel(data.item)"
                  :field="$genereteId('del', field, data.index)"
                  icon="del"
                  tooltip="remover"
                  @click="handleDel(data.item)"
                />
              </div>
            </template>
            <!--
              o código a seguir puxa os slots dos componentes ancestrais e os aplica na
              bootstrap-vue table, é uma forma de evitar ter de declarar os mesmo slots
              em toda hierarquia de componentes que usar PowerList. mais detalhes na
              resposta abaixo:
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
          </BaseTable>
        </Col>
      </Row>
    </div>
  </template>
  <script>
  import { authorizationMixin } from '../../mixins/authorization';
  import { Row, Col } from '../bv';
  //import { PowerSearch } from '../search';
  import { ActionIcon } from '../actions';
  import { AppIcon } from '../icons';
  import BaseTable from './base-table';
  
  export default {
    name: 'PowerList',
    components: {
      Row,
      Col,
      BaseList,
      PowerSearch,
      ActionIcon,
      AppIcon
    },
    mixins: [authorizationMixin],
    props: {
      field: {
        type: String,
        required: true
      },
      fields: {
        type: Array,
        required: true
      },
      searchConfig: {
        type: Object,
        default: null
      },
      items: {
        type: Array,
        required: true
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      showActionColumn: {
        type: Boolean,
        default: true
      },
      viewIcon: {
        type: String,
        default: 'view'
      },
      editIcon: {
        type: String,
        default: 'edit'
      },
      delIcon: {
        type: String,
        default: 'del'
      }
    },
    data () {
      return {
        searchedItems: []
      };
    },
    computed: {
      enhancedFields () {
        const fields = this.showActionColumn
          ? this.fields.concat({ key: 'actions', label: 'Ações', minSize: true, centerTitle: true })
          : this.fields;
  
        if (this.searchConfig?.enum) {
          fields.unshift({ key: 'enum', label: '', minSize: true });
        }
  
        return fields;
      }
    },
    methods: {
      handleView (item) {
        this.$emit('view', item);
      },
      handleEdit (item) {
        this.$emit('edit', item);
      },
      handleDel (item) {
        this.$emit('del', item);
      },
      chooseEnumColor (item) {
        const enumCfg = this.searchConfig.enum;
        const enumValue = enumCfg.find(s => s.isEnum(item));
  
        return enumValue && enumValue.color;
      }
    }
  };
  </script>
  