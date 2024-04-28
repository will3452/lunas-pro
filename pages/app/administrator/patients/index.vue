<script setup>

let state = reactive({
  patientsRecord: [],
  updateRecord: {},
  addPatientModal:false,
  refreshTable: false
})

const columnsPatients = [
  {
    key: 'email',
    label: 'Email'
  }, {
    key: 'fullName',
    label: 'Full Name'
  }, {
    key: 'contactNumber',
    label: 'Contact #'
  }, {
    key: 'bloodType',
    label: 'Blood Type'
  }, {
    key: 'nationality',
    label: 'Nationality'
  },
  {
    key: 'weight',
    label: 'Weight'
  },
  {
    key: 'height',
    label: 'Height'
  },
  {
    key: 'address',
    label: 'Address'
  },
  {
    key: 'gender',
    label: 'Gender'
  },
  {
    key: 'birthDate',
    label: 'Birthday'
  },
  {
    key: 'hmo',
    label: 'HMO'
  },
  {
    key: 'actions',
    label: 'Action'
  },
]


const loadData =  () => {
    state.refreshTable = true
}

const recordEdit = async (record) => {
  try {
    record.view = false
    state.updateRecord = record
    state.addPatientModal = true
  } catch (error) {
    console.log("🚀 ~ recordEdit ~ error:", error)
  }
}

const recordDelete = async (record) => {
  try {
    await usePatients().softDelete(record.id)
  } catch (error) {
    console.log("🚀 ~ recordDelete ~ error:", error)
  } finally {
    state.refreshTable = true
  }
}

const recordView = async (record) => {
  try {
    record.view = true
    state.updateRecord = record
    state.addPatientModal = true
  } catch (error) {
    console.log("🚀 ~ recordView ~ error:", error)
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <div>
        <span>
          Patients List
        </span>
        <span class="float-right">
          <UButton @click.prevent="state.addPatientModal = true,state.updateRecord = {}">Add Patients</UButton>
        </span>
      </div>
    </template>
    <CommonTable 
    :reload="state.refreshTable"
    :tableName="'patients'"
    @recordView="recordView"
    @recordEdit="recordEdit"
    @recordDelete="recordDelete"
    :columns="columnsPatients" 
    :viewColumn="['fullName','birthDate']" />


    <AdminPatientsAddPatientsModal 
    :record = "state.updateRecord"
    :visible="state.addPatientModal" 
    @close="state.addPatientModal = false"
    @reload="loadData(),state.addPatientModal = false" />
  </UCard>
</template>