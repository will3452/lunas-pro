<script setup>

let props = defineProps(['columns', 'reload','viewColumn','tableName']);
const $emit = defineEmits(['recordView', 'recordEdit', 'recordDelete']);


let state = reactive({
    newColumns: [],
    newRows: [],
})

// import here your composables
const tables = {
    "patients":usePatients(),
    "hmos":useHmos(),
}

const items = (row) => [
    [
        {
            label: 'View',
            icon: 'i-heroicons-eye-20-solid',
            click: () => viewRecord(row)
        },
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => editRecord(row)
        },
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => deleteRecord(row)
        },

        // {
        // label: 'Duplicate',
        // icon: 'i-heroicons-document-duplicate-20-solid'
        // }, 
        // {
        // label: 'Archive',
        // icon: 'i-heroicons-archive-box-20-solid'
        // },
    ]

]
onBeforeMount(() => {
    tableUsed()
})

const tableUsed = () => {
    try {
        Object.keys(tables).forEach(async (key) => {
            if (key == props.tableName ) {
                let supaTable =  tables[key]
                let getTable = await supaTable.findAll()
                state.newRows = getTable?.data
            }
        });
        
    } catch (error) {
        console.log("🚀 ~ tableUsed ~ error:", error)
    } finally {
        props.reload = false
    }
}

const viewRecord = (record) => {
    $emit('recordView', record)
}

const editRecord = (record) => {
    $emit('recordEdit', record)
}

const deleteRecord = (record) => {
    $emit('recordDelete', record)
}


const searchData = ref('')

const filteredRows = computed(() => {
  if (!searchData.value) {
    return state.newRows
  }

  return state.newRows.filter((rec) => {
    return Object.values(rec).some((value) => {
      return String(value).toLowerCase().includes(searchData.value.toLowerCase())
    })
  })
})
watch(() => props.reload, (value) => {
    if (value) {
        if(props.reload) tableUsed()
        state.newColumns = props?.columns
    }
})
</script>

<template>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="searchData" placeholder="Filter Patients..." />
    </div>
    <UTable :rows="filteredRows" :columns="columns">

        <template v-if="viewColumn.includes('fullName')" #fullName-data="{ row }">
            {{ `${row.lastName}, ${row.firstName} ${row.middleName}` }}
        </template>
        <template v-if="viewColumn.includes('birthDate')" #birthDate-data="{ row }">
            {{ useDateUtils().formatDate(row.birthDate, 'YYYY-MM-DD') }}
        </template>
        <template #created_at-data="{ row }">
            {{ useDateUtils().formatDate(row.created_at, 'datetime') }}
        </template>
        <template #modified_at-data="{ row }">
            {{ useDateUtils().formatDate(row.modified_at, 'datetime') }}
        </template>
        <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
        </template>
    </UTable>
</template>