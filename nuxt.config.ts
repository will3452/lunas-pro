// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxt/ui"],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      include: undefined,
      exclude: [
        '/app/patient/appointments',
        '/app/patient/',
      ],
      cookieRedirect: false,
    }, 
  }
})