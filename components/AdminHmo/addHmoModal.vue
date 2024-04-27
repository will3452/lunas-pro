<script setup>
const supabase = useSupabaseClient()

let props = defineProps(['visible', 'record']);
const $emit = defineEmits(['close', 'reload','saved']);

watch(() => props.record , (value) => { 
    if(value) {
        state.name = props.record?.name
    }
})

const toast = useToast()

const state = reactive({
    name:null,
    success:false
})


const validate = (state) => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  return errors
}
const onSubmit = async () => {
    try {
        if(props.record?.id){
            let {status,data, error } = await supabase
            .from('hmos')
            .update({ name: state.name })
            .eq('id', props.record?.id)
            console.log("🚀 ~ onSubmit ~ props.record:",props.record)
            console.log("🚀 ~ onSubmit ~ status:", status)
            if(status == 204){
                toast.add({
                    title: ` Save Successfully !`,
                    id: 'modal-success'
                })
                state.success = true
            }
        }else {
            let {status,data} = await supabase
            .from('hmos')
            .insert({ name: state.name })
            .select()

            if(status == 201){
                toast.add({
                    title: `${data[0].name} Save Successfully !`,
                    id: 'modal-success'
                })
                state.success = true
            }
        }
        $emit('saved')
    } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error)
    } finally {
        state.success = false
        state.name = null
    }
}
</script>
<template>
    <div>
        
        <UModal 
        style="width:1500px"
        v-model="props.visible" prevent-close>

            <!-- tempo for notif -->
            <div>
            </div>
            <UCard :ui="{divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                <div class="flex items-center justify-between w-full">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    {{ props.record?.id ? "Edit" : "Add" }}  HMO
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" 
                    @click="$emit('close')" />
                </div>
                </template>
                <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                    <p v-if="state.success" style="color:green">Save Successfully!</p>

                    <UFormGroup label="Name" name="name">
                    <UInput v-model="state.name" />
                    </UFormGroup>


                    <UButton class="text-right" type="submit">
                    Save
                    </UButton>
                </UForm>
            </UCard>
        </UModal>
    </div>
</template>