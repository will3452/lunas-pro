<script setup>

const patients = [
    {
        name: "Patient1",
        age: "age",
        gender: "gender",
    },
    {
        name: "Patient2",
        age: "age",
        gender: "gender",
    },
]


</script>

<template>
    <UCard>
        <template #header>
            <div>
                <span>Patients</span>
                <ULink class="float-end link"
                    to='/app/dashboard/patients'
                    >View all</ULink>
            </div>
        </template>
        <div v-for="patient of patients" :key="patient.name">
            <span>Name: {{ patient.name }}</span>
        </div>
    </UCard>
</template>