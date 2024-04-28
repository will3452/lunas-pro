<script setup>
import { debounce } from 'vue-debounce';
let props = defineProps(['columns', 'reload', 'viewColumn', 'tableName', 'paginationStatus']);
const $emit = defineEmits(['recordView', 'recordEdit', 'recordDelete', 'refreshTable']);


let state = reactive({
	newColumns: [],
	newRows: [],
	page: 1,
	pageCount: 7,
	total: 0,
	search: null,
	isLoading: true
})

// import here your composables
const tables = {
	"patients": usePatients(),
	"hmos": useHmos(),
	"medicine_types": useMedicineTypes()
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
	state.isLoading = true
	state.newRows = []
	try {
		Object.keys(tables).forEach(async (key) => {
			if (key == props.tableName) {
				let supaTable = tables[key]
				if(props.paginationStatus){
					let {data, count} = await supaTable.paginationData(state.page, state.pageCount, state.search)
					state.newRows = data
					state.total = count;
				}else{
					let getTable = await supaTable.findAll()
					state.newRows = getTable?.data
				}
				state.isLoading = false
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


watch(() => props.reload, (value) => {
	if (value) {
		if (props.reload) tableUsed()
		state.newColumns = props?.columns
	}
	$emit('refreshTable', false)
})
const updatePagination = () => {
	tableUsed()
}
const searchLogic = () => {
	tableUsed();
};
const debouncedSearchLogic = debounce(searchLogic, 1000);
const searchEvent = () => {
	state.page = 1;
	state.pageCount = 7;
	debouncedSearchLogic();
}
</script>

<template>
	<div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
		<UInput v-model="state.search" @input="searchEvent" placeholder="Filter Patients..." />
	</div>
	<UTable :rows="state.newRows" :columns="columns" :loading="state.isLoading">

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
	<div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700" v-if="props.paginationStatus">
		<UPagination v-model="state.page" :page-count="state.pageCount" :total="state.total" :max="5"
			:first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'gray' }"
			:last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'gray' }"
			show-first show-last @click="updatePagination" />
	</div>
</template>