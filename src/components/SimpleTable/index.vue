<template>
  <el-table border stripe :row-key="rowKey" :data="data" size="small" empty-text="暂无数据" @selection-change="onSelectionChange" v-bind="$attrs">
    <el-table-column v-if="allowSelect" type="selection" width="55" />
    <template v-for="column in columns">
      <!-- 自定义内容 -->
      <el-table-column v-if="column.slot" :key="column.property">
        <template v-slot:header>
          <slot :name="column.slot.header">{{ column.label || '需要自定义header内容' }}</slot>
        </template>
        <template v-slot:default="scope">
          <slot :name="column.slot.body" :data="scope.row">{{ scope.row[column.property] || '需要自定义body内容' }}</slot>
        </template>
      </el-table-column>
      <!-- 没有自定义内容 -->
      <el-table-column v-else :key="column.property + ''" v-bind="column"></el-table-column>
    </template>
  </el-table>
  <el-pagination
    v-if="showPaging"
    layout="sizes, prev, pager, next, jumper, total,slot"
    :page-sizes="[10, 20, 30, 40, 50]"
    v-bind="pagination"
    @size-change="onSizeChange"
    @current-change="onPagingChange"
  ></el-pagination>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface ColumnRow {
  label: string
  property: string
  [key: string]: any
  slot?: {
    body?: string
    header?: string
  }
}

export default defineComponent({
  name: 'SimpleTable',
  props: {
    // 表格列
    columns: {
      type: Array as PropType<ColumnRow[]>,
      default: () => []
    },
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    // 表格key
    rowKey: {
      type: String,
      default: 'id'
    },
    // 是否可选
    allowSelect: {
      type: Boolean,
      default: false
    },
    // 是否分页
    showPaging: {
      type: Boolean,
      default: true
    },
    // 分页
    pagination: {
      type: Object,
      default: () => ({ currentPage: 2, pageSize: 20, total: 100, pageCount: 8 })
    }
  },
  setup(props, { emit }) {
    // 表格选中 ｜ 反选
    const onSelectionChange = (multipleSelection: any) => {
      emit('select', multipleSelection)
    }

    const onPagingChange = (page: number) => {
      emit('pagingChange', { page, size: props.pagination.pageSize })
    }
    const onSizeChange = (size: number) => {
      emit('pagingChange', { page: 1, size })
    }
    return {
      onSelectionChange,
      onPagingChange,
      onSizeChange
    }
  }
})
</script>

<style scoped lang="scss">
:deep(.el-table__header-wrapper) {
  th {
    background-color: #f5f7fa;
    color: #333333;
    font-weight: 700;
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
