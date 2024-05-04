<script setup>

let state = reactive({
  appointmentsRecord: [],
  updateRecord: {},
  addAppointmentModal:false,
  refreshTable: false
})

const columnsAppointments = [
  {
    key: 'doctor',
    label: 'Doctor'
  }, {
    key: 'date',
    label: 'Schedule'
  }, {
    key: 'patient',
    label: 'Patient'
  }, {
    key: 'hospital',
    label: 'Hospital'
  }, {
    key: 'clinic',
    label: 'Clinic'
  },
  {
    key: 'created_at',
    label: 'Created Date'
  },
  {
    key: 'actions',
    label: 'Actions'
  },
]

const loadData =  () => {
    state.refreshTable = true
}

</script>
<template>
    <div>
        <UCard>
            <template #header>
                <div>
                    <span>
                        Appointments List
                    </span>
                    <span class="float-right">
                        <UButton @click.prevent="state.addAppointmentModal = true,state.updateRecord = {}">Create Appointment</UButton>
                    </span>
                </div>
            </template>

            <!-- @recordView="recordView"
            @recordEdit="recordEdit"
            @recordDelete="recordDelete" -->
            <CommonTable 
                :reload="state.refreshTable"
                :paginationStatus="true"
                :tableName="'patients'"
                :columns="columnsAppointments" />
                
        </UCard>
        <PatientsCreateAppointmentModal 
            :visible="state.addAppointmentModal" 
            @close="state.addAppointmentModal = false"
            @reload="loadData(),state.addAppointmentModal = false" />

    </div>
</template>