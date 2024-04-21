<script setup>
    definePageMeta({
        middleware: 'auth'
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
    <div class="flex h-screen justify-center items-center">
        <div>
            Hello {{ user.user.email }} ! 
            <div>
                <UButton @click.prevent="logout">logout for now</UButton>
            </div>
        </div>
    </div>
</template>