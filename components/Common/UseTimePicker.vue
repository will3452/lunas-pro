<script setup>

let props = defineProps(['record']);
const $emit = defineEmits(['close', 'reload']);

let state = reactive({
    time:null
})
const getTime = (val) => {
    console.log("🚀 ~ getTime ~ val:", val)
    console.log("🚀 ~ getTime ~ val:", state.time)
}

</script>

<template>
    <div>
        <input @click="getTime" v-model="state.time" type="time" class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
    </div>
</template>
<style>

.time{

}
</style>

