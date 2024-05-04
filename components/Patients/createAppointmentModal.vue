<script setup>

let props = defineProps(['visible', 'record']);
const $emit = defineEmits(['close', 'reload']);

let state = reactive({
    form:{
        view: false
    }
})

watch(() => props.visible , (value) => { 
    if(value) {
        state.form = {};
    }
})


const validate = (state) => {
  const errors = []
//   if (!state.name) errors.push({ path: 'name', message: 'Required' })
  return errors
}
</script>
<template>
    <div>
        <UModal 
        style="width:1500px"
        v-model="props.visible" prevent-close>
            <UCard :ui="{divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                <div class="flex items-center justify-between w-full">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    {{ state.form?.view ? 'View' : state.form?.id ? 'Edit' : 'Add' }} Appointment
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" 
                    @click="$emit('close'),state.form={}" />
                </div>
                </template>
                <UForm :validate="validate" :state="state.form" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Doctor" name="doctor"   >
                        <USelect
                            :disabled='state.form?.view' v-model="state.form.doctor"
                            placeholder="Select Doctor"
                            :options="['Doctor1', 'Doctor2']"
                        />
                    </UFormGroup>
                    <UFormGroup label="Hospital" name="hospital"   >
                        <USelect
                            :disabled='state.form?.view' v-model="state.form.hospital"
                            placeholder="Select Hospital"
                            :options="['Hospital1', 'Hospital2']"
                        />
                    </UFormGroup>
                    <UFormGroup label="Clinic" name="clinic"   >
                        <USelect
                            :disabled='state.form?.view' v-model="state.form.clinic"
                            placeholder="Select Clinic"
                            :options="['Clinic1', 'Clinic2']"
                        />
                    </UFormGroup>
                    <UFormGroup label="Date" name="date" >
                        <CommonUseDatePicker  />
                    </UFormGroup>
                    <UFormGroup label="Time" name="time"   >
                        <CommonUseTimePicker  />
                    </UFormGroup>
                    <UFormGroup label="Reason" name="reason"   >
                        <UTextarea resize placeholder="Reason..." />
                    </UFormGroup>
                    <UCheckbox color="primary" label="Follow up" />
                    <UButton  block type="submit">
                        Set Appointment
                    </UButton>
                </UForm>
            </UCard>
        </UModal>
    </div>

</template>