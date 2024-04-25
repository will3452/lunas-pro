<script setup>
let props = defineProps(['visible', 'record']);
const $emit = defineEmits(['close', 'reload']);

watch(() => props.record , (value) => { 
    if(value) {
        data.form = props.record;
    }
})

const data = reactive({
    form:{}
})
const email = ref('')
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
                    Add Patient
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" 
                    @click="$emit('close')" />
                </div>
                </template>
                Need to adjust Width for design of Modal
                <UFormGroup v-slot="{ error }" label="Email" :error="!email && 'You must enter an email'" help="This is a nice email!">
                    <UInput v-model="email" type="email" placeholder="Enter email" :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
                </UFormGroup>
            </UCard>
        </UModal>
    </div>
</template>