<script setup>
const appointments = [
    {
    name: "Test 1",
    schedule: "11:00 am",
    reason: "test"
    },
    {
        name: "Test 2",
        schedule: "01:00 pm",
        reason: "test"
    }
]
</script>

<template>

    <div>
        <UCard>
            <h4 class="font-bold text-2xl">Today Appointments</h4>
            <div class="mt-5">
                <UCard class="" v-for="appointment of appointments" :key="name">
                    <span>{{ appointment.name }}</span>
                    <span>{{ appointment.schedule }}</span>
                    <span>{{ appointment.reason }}</span>
                </UCard>
            </div>
        </UCard>
    </div>
</template>