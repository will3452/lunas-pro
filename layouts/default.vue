<script setup>
const route = useRoute()
const session = useSupabaseSession()

async function logout() {
      // Redirect the user to the logout URL
    window.location.href = '/logout';
}

const sideBar = [
    [
        {
            label: 'Dashboard',
            icon: 'i-heroicons-chart-pie',
            to: '/app'
        },
        {
            label: 'My Schedules', 
            icon: 'i-heroicons-calendar-days', 
        },
        {
            label: 'Reports',
            icon: 'i-heroicons-table-cells',
            to: `/app/reports`
        }, {
            label: 'Medical Records',
            icon: 'i-heroicons-folder',
            to: '/app/medical-records'
        }, {
            label: 'Blogs',
            icon: 'i-heroicons-chat-bubble-bottom-center-text'
        }
    ],
    [
        {
            label: 'Activity Logs',
            icon: 'i-heroicons-queue-list'
        }, {
            label: 'FAQs',
            icon: 'i-heroicons-question-mark-circle'
        },
    ],
    [
        {
            label: 'Patients',
            icon: 'i-heroicons-user-group',
            to: '/app/administrator/patients'
        },
        {
            label: 'Doctors',
            icon: 'i-heroicons-user-group',
            to: '/app/administrator/doctors'
        },
        {
            label: 'Prescriptions',
            icon: 'i-heroicons-document-text'
        },
        {
            label: 'Billing & Invoices',
            icon: 'i-heroicons-currency-dollar'
        },
    ], 
    [
        {
            label: 'Users',
            icon: 'i-heroicons-user-group'
        },
        {
            label: 'Medicines',
            icon: 'i-heroicons-beaker',
            to: '/app/administrator/medicines'
        },
        {
            label: 'HMO',
            icon: 'i-heroicons-circle-stack',
            to: '/app/administrator/hmo'
        },
        {
            label: 'Settings',
            icon: 'i-heroicons-cog-6-tooth'
        }
    ]
]


const navBar = [
    [], 
    [
        {
            label: `Notifications`,
            icon: 'i-heroicons-bell', 
            badge: 19
        },
        {
            label: `${session?.value?.user?.user_metadata.full_name}`,
            avatar: {
                src: `${session?.value?.user?.user_metadata.picture}`
            },
            badge: 0
        },
        {
            label: 'Logout',
            icon: 'i-heroicons-arrow-left-start-on-rectangle', 
            click: () => {
                logout()
            }
        }
    ]
]
</script>
<template>
    <div class="grid md:grid-cols-12">
        <div class="col-span-2 border-r h-screen p-2">
            <h1 class="text-center p-2 font-bold text-2xl font-serif"><span class="text-green-500">Lunas</span>Pro</h1>
            <UVerticalNavigation  :links="sideBar"></UVerticalNavigation>
        </div>
        <div class="col-span-10">
            <UHorizontalNavigation :links="navBar" class="border-b border-gray-200 dark:border-gray-800" />
            <UContainer class="mt-4">
                <NuxtPage />
            </UContainer>
        </div>
    </div>
</template>