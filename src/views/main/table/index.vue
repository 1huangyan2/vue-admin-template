<template>
  <ContentWrapper>
    <SimpleTable :data="tableData" :columns="columns" :allow-select="true" @select="handleSelectColumns" :pagination="pagination" @pagingChange="pagingChange">
      <template #createAtBody="scope">
        <el-tag>{{ scope.data.create_at }}</el-tag>
      </template>
      <template #operationSlot>
        <el-button size="small" type="primary" plain>编辑</el-button>
        <el-button size="small" type="danger" plain>删除</el-button>
      </template>
    </SimpleTable>
  </ContentWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ColumnRow } from '@/components/SimpleTable/index.vue'

interface TableRow {
  name: string
  age: number
  create_at: string
  id: number
}

const tableData: TableRow[] = [
  {
    name: 'zs',
    age: 20,
    id: 1,
    create_at: '2021-10-11'
  },
  {
    name: 'zs1',
    age: 21,
    id: 2,
    create_at: '2021-10-11'
  },
  {
    name: 'zs2',
    age: 22,
    id: 3,
    create_at: '2021-10-11'
  },
  {
    name: 'zs3',
    age: 23,
    id: 4,
    create_at: '2021-10-11'
  }
]

const columns: ColumnRow[] = [
  {
    property: 'name',
    label: '姓名'
  },
  {
    property: 'age',
    label: '年龄'
  },
  {
    property: 'create_at',
    label: '创建时间',
    slot: {
      body: 'createAtBody'
    }
  },
  {
    property: 'operation',
    label: '操作',
    slot: {
      body: 'operationSlot'
    }
  }
]

const pagination: any = {
  total: 35,
  pageSize: 20,
  currentPage: 2
}

export default defineComponent({
  setup() {
    const state = reactive({
      tableData,
      columns,
      pagination
    })
    // 选中
    const handleSelectColumns = (val: TableRow[]) => {
      console.log(val)
    }

    // 分页器change
    const pagingChange = (params: { page: number; size: number }) => {
      console.log(params)
    }
    return {
      ...toRefs(state),
      handleSelectColumns,
      pagingChange
    }
  }
})
</script>

<style scoped></style>
