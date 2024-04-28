<script setup>
import { debounce } from 'vue-debounce';
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
	update: null,
	search: null,
	refreshTable: false
})

const OpenModal = () => state.addModalStatus = true
const closeModal = () => {
	state.addModalStatus = false
	state.update = null
}
const submitData = async (data) => {
	console.log('submit')
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
		state.refreshTable = true;
	}
}
const updateData = async (dataUpdate) => {
	state.isSubmitting = true;
	try {
		let { status, data, error } = await supabase
			.from('medicine_types')
			.update({ name: dataUpdate.name, description: dataUpdate.description, updated_at: new Date() })
			.eq('id', dataUpdate.id)
		if (status) {
			state.addModalStatus = false
			state.isSubmitting = false
			state.update = null
		}
	} catch (error) {
		console.log(error);
	}
}


const recordView = async (record) => {
 console.log(record);
}
const recordEdit = async (record) => {
  console.log(record)
}
const recordDelete = async (record) => {
	console.log(record);
}
const refreshTableEvent = async (status) => {
	state.refreshTable = status;
}
</script>

<template>
	<UBreadcrumb divider="/"
		:links="[{ label: 'Medicine', to: '/app/administrator/medicines/' }, { label: 'Medicine Type', to: '/app/administrator/medicines/medicine-type' },]"
		class="mb-4" />
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
		<CommonTable 
		:reload="state.refreshTable"
		:tableName="'medicine_types'"
		:paginationStatus="true"
		@recordView="recordView"
		@recordEdit="recordEdit"
		@recordDelete="recordDelete"
		@refreshTable="refreshTableEvent"
		:columns="columns" 
		:viewColumn="['fullName','birthDate']" />
	</UCard>
	<AdminMedicinesAddMedicineTypeModal :isOpen="state.addModalStatus" :isSubmitting="state.isSubmitting"
		@closeModal="closeModal" @submitData="submitData" :update="state.update" @updateData="updateData" />
</template>