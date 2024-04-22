<script setup lang="ts">
definePageMeta({
    middleware: 'guest', 
    layout:'auth'
})

import google from '~/assets/google.png'; 

const supabase = useSupabaseClient()
const email = ref('')

const state = ref({}) // test 

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
      <h1 class="text-4xl text-center text-green-700 font-serif">LunasPro</h1>
      <h2 class="text-center font-serif">Efficient Solutions, Empowered Healthcare.</h2>
      <UForm class="mt-4" :state="state">
        <UFormGroup label="Email">
          <UInput v-model="email" type="email" placeholder="Enter email." >
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
      <div class="text-center font-serif">
        Sign in with
      </div>
      <img :src="google" @click="signWithGoogle" class="w-16 mx-auto mt-2 cursor-pointer"/> 
    </UCard>
  </div>
</template>
