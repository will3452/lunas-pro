<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const user = useSupabaseSession()

    const auth = useSupabaseClient().auth

    async function signOut() {
        await auth.signOut()
        navigateTo('/'); 
    }
</script>

<template>
    <div class="flex h-screen justify-center items-center">
        <div>
            Hello {{ user.user.email }} ! 
            <div>
                <UButton @click.prevent="signOut">logout for now</UButton>
            </div>
        </div>
    </div>
</template>