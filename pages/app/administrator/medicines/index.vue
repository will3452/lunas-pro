<script setup>
definePageMeta({
	middleware: 'auth',
	layout: 'default',
})
const user = useSupabaseSession()

// const auth = useSupabaseClient().auth

// async function signOut() {
//     await auth.signOut()
//     navigateTo('/'); 
// }
async function logout() {
	// Redirect the user to the logout URL
	window.location.href = '/logout';
}
</script>

<template>
	<UBreadcrumb
		divider="/"
		:links="[{ label: 'Medicine', to: '/app/administrator/medicines/' }, ]"
		class="mb-4"
	/>
	<UCard>
		<template #header>
			<div class="text-2xl font-bold">
				Medicine
			</div>
		</template>
		<div class="mt-4 grid grid-cols-2 gap-4">
			<AdminMedicinesCard link="/app/administrator/medicines/medicine-type" title="Medicine Type"/>
			<AdminMedicinesCard link="/app/administrator/medicines/medicine-list" title="Medicine List"/>
		</div>
	</UCard>
</template>