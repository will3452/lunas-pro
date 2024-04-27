<script setup>
// import { useDateUtils } from '@/composables';

const data = reactive({
    todayDate: null,
    todayTime: null
})

definePageMeta({
    middleware: 'auth',
    layout: 'default',
})
const user = useSupabaseSession()

async function logout() {
    // Redirect the user to the logout URL
    window.location.href = '/logout';
}
onMounted(() => {
    updateClock();
    setInterval(updateClock, 1000);
});

onBeforeUnmount(() => {
    clearInterval(updateClock);
});
const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    data.todayTime = timeString
    data.todayDate = useDateUtils().formatDate(new Date())
}

</script>

<template>
    <UCard>
        <template #header>
            <div class="text-2xl font-bold">
                Dashboard
            </div>
        </template>
    </UCard>

    <div class="grid grid-flow-col auto-cols-auto gap-4 mt-5">
        <div>
            <UCard>
                <h4 class="font-bold text-2xl">Time</h4>
                <div class="flex content-center grid justify-items-center mt-5">
                    <div class="font-bold text-4xl">{{ data.todayTime }}</div>
                    <div class="opacity-50">{{ data.todayDate }}</div>
                </div>
            </UCard>
        </div>
        <div>
            <UCard>
                <h4 class="font-bold text-2xl">Appointments</h4>
                <div class="flex content-center grid justify-items-center mt-5">
                    <span class="font-bold text-4xl">999</span>
                    <h4 class="opacity-50">Total Appointments</h4>
                </div>
            </UCard>
        </div>
        <div>
            <UCard>
                <h4 class="font-bold text-2xl">Patients</h4>
                <div class="flex content-center grid justify-items-center mt-5">
                    <span class="font-bold text-4xl">999</span>
                    <h4 class="opacity-50">Total Patients</h4>
                </div>
            </UCard>
        </div>
    </div>

    <div class="grid grid-flow-col auto-cols-auto gap-4 mt-5">
        <div>
            <AdminDashboardPatientsCard />
        </div>
        <div>
            <AdminDashboardActivityLogsCard />
        </div>
    </div>
</template>