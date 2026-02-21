// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxtjs/tailwindcss'],
  fonts: {
    families: [
      { name: 'Lato', provider: 'google' }, // Substituindo Montserrat por Roboto
    ]
  }
})