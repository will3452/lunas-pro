<script setup lang="ts">
definePageMeta({
    middleware: 'guest', 
})

const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })
  if (error) console.log(error)
}
</script>
<template>
  <div class="flex justify-center items-center h-screen gap-2">
    <UInput
      v-model="email"
      type="email"
    />
    <UButton @click="signInWithOtp">
      Sign In with E-Mail
    </UButton>
  </div>
</template>
