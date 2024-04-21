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

async function signWithGoogle () {
  await supabase.auth.signInWithOAuth({
    provider: 'google', 
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
}
</script>
<template>
  <div class="flex justify-center items-center h-screen gap-2">
    <UCard class="w-full md:w-1/3 m-2">
      <h1 class="text-4xl text-center">LunasPro</h1>
      <UForm class="mt-2">
        <UFormGroup label="Email">
          <UInput v-model="email" type="email">
            <template #trailing>
              <UIcon name="i-heroicons-envelope-20-solid"/>
            </template>
          </UInput>
        </UFormGroup>
      </UForm>
      <UButton block class="mt-2" @click="signInWithOtp">
        Sign In with Email
      </UButton>
      <div class="text-center my-2">or</div>
      <UButton color="white" block @click="signWithGoogle">
        Sign in with Google
      </UButton>
    </UCard>
  </div>
</template>
