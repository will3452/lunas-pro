<script setup>
    const auth = useSupabaseClient().auth
    async function signOut() {
        await auth.signOut()
        navigateTo('/'); 
    }
    signOut()
</script>