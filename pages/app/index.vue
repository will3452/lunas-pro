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
    <UCard>
        <template #header>
            <div class="text-2xl font-bold">
                Dashboard
            </div>
        </template>
    </UCard>
</template>