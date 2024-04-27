<script setup>
const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false
	},
	isSubmitting: {
		type: Boolean,
		default: false,
	},
	update:{
		type: Object,
		default: null
	}
});
let state = reactive({
	name: null,
	description: null,
})
const emit = defineEmits(['closeModal', 'submitData'])
const submitForm = () => {
	props.update ? emit('updateData', {...state, id: props.update.id}) : emit('submitData', state)
}

const validate = (state) => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  if (!state.description) errors.push({ path: 'description', message: 'Required' })
  return errors
}

watch(() => props.isOpen, (value) => { 
	state.name = null;
	state.description = null;
})
watch(() => props.update, (value) => { 
	if(value){
		state.name = value.name
		state.description = value.description
	}
})

const closeModal = () => emit('closeModal')
</script>
<template>
	<UModal v-model="props.isOpen" preventClose>
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						{{ update ? 'Update' : 'Add' }} Medicine Type
					</h3>
					<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeModal" />
				</div>
			</template>

			<UForm class="space-y-4" :validate="validate" :state="state" @submit="submitForm">
				<UFormGroup label="Name" name="name">
					<UInput type="text" v-model="state.name"  placeholder="Name..."/>
				</UFormGroup>

				<UFormGroup label="Description" name="description">
					<UTextarea
						autoresize
						:maxrows="5"
						placeholder="Description..."
						v-model="state.description"
					/>
				</UFormGroup>

				<UButton type="submit" block :loading="props.isSubmitting">
					{{ update ? 'Update' : 'Add' }}
				</UButton>
			</UForm>
		</UCard>
	</UModal>
</template>