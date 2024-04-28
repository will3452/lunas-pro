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
        '/app/administrator/patients',
        '/app/administrator/doctors',
        '/app/administrator/medicine-type',
        '/app/administrator/medicine-list'
      ],
      cookieRedirect: false,
    }, 
  }
})