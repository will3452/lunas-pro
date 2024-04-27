<script setup>

const logs = [
    {
        name: "Logs 1",
        description: "Description"
    },
    {
        name: "Logs 2",
        description: "Description"
    },
]

</script>


<template>
    <UCard>
        <template #header>
            <span>Activity Logs</span>
            <span class="float-end">
                <ULink
                    to="app/dashboard/activityLogs"    
                >
                    View All
                </ULink>
            </span>
        </template>

        <div>
            <UCard class="mt-2" v-for="log of logs " :key="log.name">
                <div> {{ log.name }}</div>
                <div> {{ log.description }}</div>
            </UCard>
        </div>
    </UCard>
</template>