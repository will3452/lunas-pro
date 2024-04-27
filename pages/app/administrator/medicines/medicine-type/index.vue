<script setup>
definePageMeta({
	middleware: 'auth',
	layout: 'default',
})

const supabase = useSupabaseClient()
async function logout() {
	window.location.href = '/logout';
}
const columns = [{
	key: 'id',
	label: 'ID'
}, {
	key: 'name',
	label: 'Name'
}, {
	key: 'description',
	label: 'Description'
}, {
	key: 'created_at',
	label: 'Created Date'
}, {
	key: 'updated_at',
	label: 'Modified Date'
}, {
	key: 'actions',
	label: 'Actions'
}
]
let state = reactive({
	addModalStatus: false,
	isLoading: true,
	isSubmitting: false,
	page: 1,
	pageCount: 7,
	total: 0,
	medicine_types: [],
	update: null,
	search: null
})
const items = (row) => [
	[{
		label: 'Edit',
		icon: 'i-heroicons-pencil-square-20-solid',
		click: () => {
			state.update = row;
			state.addModalStatus = true
		}
	},
	{
		label: 'Delete',
		icon: 'i-heroicons-trash-20-solid',
		click: () => deleteMedicineType(row.id)
	}
	]
]

const OpenModal = () => state.addModalStatus = true
const closeModal = () => {
	state.addModalStatus = false
	state.update = null
}
const rows = computed(() => {
	const modifiedMedicineTypes = state.medicine_types.map(medicine => {
			const date = new Date(medicine.created_at);
			const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
			return { ...medicine, created_at: formattedDate };
	});
	if (!state.search) {
		state.total = modifiedMedicineTypes.length;
		return modifiedMedicineTypes.slice((state.page - 1) * state.pageCount, (state.page) * state.pageCount)
  }
	else{
		let newSet = modifiedMedicineTypes.slice((state.page - 1) * state.pageCount, (state.page) * state.pageCount).filter((medicine) => {
			return Object.values(medicine).some((value) => {
				return String(value).toLowerCase().includes(state.search.toLowerCase())
			})
		})
		state.total = newSet.length
		return newSet;
	}
})
const loadData = async () => {
	const offset = (state.page - 1) * state.pageCount;
	try {
		let { data, error } = await supabase
			.from('medicine_types')
			.select()
			.order('created_at', { ascending: true });
		state.medicine_types = data
		state.isLoading = false
		state.total = state.medicine_types.length
	} catch (error) {
		console.log(error)
		state.isLoading = false
	}
}
const updatePagination = () => {
	console.log(state.page);
}
const submitData = async (data) => {
	const { name, description } = data;
	state.isSubmitting = true;
	const { dataSuccess, error } = await supabase.from('medicine_types').insert([
		{
			name: name,
			description: description
		},
	])
	if (error) console.log(error);
	else {
		state.addModalStatus = false
		state.isSubmitting = false
		loadData()
	}
}
const deleteMedicineType = async (id) => {
	try {
		await supabase
			.from('medicine_types')
			.delete()
			.eq('id', id)
		loadData()
	} catch (error) {
		console.log(error)
	}
}
const updateData = async (dataUpdate) => {
	try {
		let { status, data, error } = await supabase
			.from('medicine_types')
			.update({ name: dataUpdate.name, description: dataUpdate.description })
			.eq('id', dataUpdate.id)
		if (status) {
			console.log('success')
			loadData()
		}
	} catch (error) {
		console.log(error);
	}
}
onBeforeMount(() => {
	loadData();
});
</script>

<template>
	<UBreadcrumb
		divider="/"
		:links="[{ label: 'Medicine', to: '/app/administrator/medicines/' }, { label: 'Medicine Type', to: '/app/administrator/medicines/medicine-type' },]"
		class="mb-4"
	/>
	<UCard>
		<template #header>
			<div>
				<span>
					Medicine Type
				</span>
				<span class="float-right">
					<UButton @click.prevent="OpenModal">Add Medicine Type</UButton>
				</span>
			</div>
		</template>
		<div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
			<UInput v-model="state.search" placeholder="Search..." />
		</div>
		<UTable :columns="columns" :rows="rows" :loading="state.isLoading">
			<template #actions-data="{ row }">
				<UDropdown :items="items(row)">
					<UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
				</UDropdown>
			</template>
		</UTable>
		<div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
			<UPagination v-model="state.page" :page-count="state.pageCount" :total="state.total" :max="5"
				:first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'gray' }"
				:last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'gray' }"
				show-first show-last @click="updatePagination" />
		</div>
	</UCard>
	<AdminMedicinesAddMedicineTypeModal :isOpen="state.addModalStatus" :isSubmitting="state.isSubmitting"
		@closeModal="closeModal" @submitData="submitData" :update="state.update" @updateData="updateData" />
</template>