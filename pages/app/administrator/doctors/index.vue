<script setup>

let state = reactive({
  patientsRecord: [],
  updateRecord: {},
  addDoctorModal:false,
  refreshTable: false
})

const columnsDoctors = [
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
    key: 'licenseNumber',
    label: 'Licence #.'
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
    state.addDoctorModal = true
  } catch (error) {
    console.log("🚀 ~ recordEdit ~ error:", error)
  }
}

const recordDelete = async (record) => {
  try {
    await useDoctors().softDelete(record.id)
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
    state.addDoctorModal = true
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
          Doctor List
        </span>
        <span class="float-right">
          <UButton @click.prevent="state.addDoctorModal = true,state.updateRecord = {}">Add Doctor</UButton>
        </span>
      </div>
    </template>
    <CommonTable 
    :reload="state.refreshTable"
    :tableName="'doctors'"
    @recordView="recordView"
    @recordEdit="recordEdit"
    @recordDelete="recordDelete"
    :columns="columnsDoctors" 
    :viewColumn="['fullName','birthDate']" />


    <AdminDoctorsAddDoctorsModal 
    :record = "state.updateRecord"
    :visible="state.addDoctorModal" 
    @close="state.addDoctorModal = false"
    @reload="loadData(),state.addDoctorModal = false" />
  </UCard>
</template>