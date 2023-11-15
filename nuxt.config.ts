// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [{ hid: 'og:image', property: 'og:image', content: '/Og-image.png' }]
    }
  },
  css: [
    '~/assets/css/dracula.css'
  ],
  plugins: [
    '~/plugins/tabler-icons.js'
  ],
  modules: ["@nuxt/content"],
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
})
