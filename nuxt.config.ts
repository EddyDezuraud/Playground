// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: [
    '~/assets/css/dracula.css'
  ],
  plugins: [
    '~/plugins/tabler-icons.js',
    '~/plugins/highlight.js'
  ],
  modules: ["@nuxt/content"],
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
})
