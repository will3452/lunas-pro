<script setup>
const supabase = useSupabaseClient()

const columns = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'created_at',
        label: 'Created Date'
    },
    {
        key: 'modified_at',
        label: 'Modified Date'
    },
    {
        key: 'actions',
        label: 'Actions'
    },
]


let state = reactive({
    hmo: [],
    record:{},
    addHmoModal:false
})

const searhName = ref('')

onBeforeMount(() => {
    loadData();
});

const loadData = async () => {
    try {
        let { data, error } = await supabase
            .from('hmos')
            .select()
        state.hmo = data
    } catch (error) {
        console.log("🚀 ~ loadData ~ error:", error)
    }
}


const filteredRows = computed(() => {
    if (!searhName.value) {
        return state.hmo
    }

    return state.hmo.filter((hmo) => {
        return Object.values(hmo).some((value) => {
            return String(value).toLowerCase().includes(searhName.value.toLowerCase())
        })
    })
})

const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
            state.record = row
            state.addHmoModal = true
        }
    },
    {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => deleteHmo(row.id)
    }
    ]
    //  {
    //     label: 'Duplicate',
    //     icon: 'i-heroicons-document-duplicate-20-solid'
    // }, 
    // {
    //     label: 'Archive',
    //     icon: 'i-heroicons-archive-box-20-solid'
    // },
]
const deleteHmo = async (id) => {
    try {
        await supabase
        .from('hmos')
        .delete()
        .eq('id',id)
        
        loadData()
    } catch (error) {
        console.log("🚀 ~ deleteHmo ~ error:", error)
    }
}
</script>

<template>
    <UCard>
        <template #header>
            <div>
                <span>
                    HMO List
                </span>
                <span class="float-right">
                    <UButton @click.prevent="state.addHmoModal = true">Add HMO</UButton>
                </span>
            </div>
        </template>
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="searhName" placeholder="Filter HMO..." />
        </div>
        <UTable :rows="filteredRows" :columns="columns" >
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>

        <AdminHmoAddHmoModal 
            :record="state.record"
            :visible="state.addHmoModal" @close="state.addHmoModal = false"
            @saved="loadData(), state.addHmoModal = false" />
    </UCard>
</template>