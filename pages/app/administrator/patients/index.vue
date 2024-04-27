<script setup>
const addPatientModal = ref(false)

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Name'
}, {
  key: 'age',
  label: 'age'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'gender',
  label: 'gender'
}]

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  age: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  gender: 'Male'
}, {
  id: 2,
  name: 'Courtney Henry',
  age: 'Designer',
  email: 'courtney.henry@example.com',
  gender: 'Male'
}, {
  id: 3,
  name: 'Tom Cook',
  age: 'Director of Product',
  email: 'tom.cook@example.com',
  gender: 'Male'
}, {
  id: 4,
  name: 'Whitney Francis',
  age: 'Copywriter',
  email: 'whitney.francis@example.com',
  gender: 'Male'
}, {
  id: 5,
  name: 'Leonard Krasner',
  age: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  gender: 'Male'
}, {
  id: 6,
  name: 'Floyd Miles',
  age: 'Principal Designer',
  email: 'floyd.miles@example.com',
  gender: 'Male'
}]

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

</script>

<template>
    <UCard>
        <template #header>
            <div>
                <span>
                    Patients List
                </span>
                <span class="float-right">
                    <UButton  @click.prevent="addPatientModal = true">Add Patients</UButton>
                </span>
            </div>
        </template>
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
            <UInput v-model="q" placeholder="Filter Patients..." />
        </div>
        <UTable :rows="filteredRows" :columns="columns" :page-count="pageCount" />

        <AdminPatientsAddPatientsModal :visible="addPatientModal" @close="addPatientModal = false"/>
    </UCard>
</template>