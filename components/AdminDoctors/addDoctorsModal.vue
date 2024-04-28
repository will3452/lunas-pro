<script setup>
import { format } from 'date-fns'
const date = ref(new Date())

let props = defineProps(['visible', 'record']);
const $emit = defineEmits(['close', 'reload']);

watch(() => props.visible , (value) => { 
    if(value) {
        state.form = props.record;
    }
})

const state = reactive({
    form:{}
})

const onSubmit = () => {
    try {
        delete state.form.view
        let payload = state.form
        if(payload.id) useDoctors().update(payload.id,payload)
        else useDoctors().create(payload)
        $emit('reload')
    } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error)
    }

}

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
                    {{ state.form.view ? 'View' : state.form.id ? 'Edit' : 'Add' }} Patient
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" 
                    @click="$emit('close'),state.form={}" />
                </div>
                </template>
                <UForm :validate="validate" :state="state.form" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Email" name="email"   >
                        <UInput :disabled='state.form.view' v-model="state.form.email" placeholder="Email Address" />
                    </UFormGroup>
                    <UFormGroup label="First Name" name="firstName"   >
                        <UInput :disabled='state.form.view' v-model="state.form.firstName" placeholder="First Name" />
                    </UFormGroup>
                    <UFormGroup label="Last Name" name="lastName">
                        <UInput :disabled='state.form.view' v-model="state.form.lastName" placeholder="Last Name" />
                    </UFormGroup>
                    <UFormGroup label="Middle Name" name="middleName" >
                        <UInput :disabled='state.form.view' v-model="state.form.middleName" placeholder="Middle Name" />
                    </UFormGroup>
                    <UFormGroup label="Birth Day" name="birthDate" >
                        <UPopover :popper="{ placement: 'bottom-start' }">
                            <UButton block icon="i-heroicons-calendar-days-20-solid" :label="format(!isNaN(state.form.birthDate) ? state.form.birthDate : date, 'd MMM, yyy')" />

                            <template #panel="{ close }">
                                <CommonDatePicker  :disabled='state.form.view' v-model="state.form.birthDate"  @close="close" />
                            </template>
                        </UPopover>
                    </UFormGroup>
                    <UFormGroup label="Gender" name="gender">
                        <USelect
                            :disabled='state.form.view' v-model="state.form.gender"
                            placeholder="Select Gender"
                            :options="['Male', 'Female']"
                        />
                    </UFormGroup>
                    <UFormGroup label="Contact #." name="contactNumber">
                        <UInput :disabled='state.form.view' v-model="state.form.contactNumber" placeholder="Contact #." />
                    </UFormGroup>
                    <UFormGroup label="Licence #." name="licenseNumber">
                        <UInput :disabled='state.form.view' v-model="state.form.licenseNumber" placeholder="Licence #." />
                    </UFormGroup>

                    <UFormGroup label="Address" name="address">
                        <UInput :disabled='state.form.view' v-model="state.form.address" placeholder="Complete Address" />
                    </UFormGroup>

                    <UButton  block type="submit">
                    Save
                    </UButton>
                </UForm>
            </UCard>
        </UModal>
    </div>
</template>