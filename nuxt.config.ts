export default defineNuxtConfig({
  // server side rendering mode
  ssr: false,
  // app
  app: {
    head: {
      title: 'Nuxt 3 Awesome Starter',
      titleTemplate: '%s - Nuxt 3 Awesome Starter',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Nuxt 3 Awesome Starter',
        },
        { name: "referrer", content: "no-referrer" },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // css
  css: [
  ],

  // plugins
  plugins: [],

  // build
  build: {
  },

  target: 'static',

  // modules
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  // experimental features
  // experimental: {
  //   reactivityTransform: false,
  // },

  // auto import components
  components: true,


})
