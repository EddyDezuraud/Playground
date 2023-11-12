// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})
