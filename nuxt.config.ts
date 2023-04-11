export default defineNuxtConfig({
  // server side rendering mode
  ssr: false,
  // app
  app: {
    head: {
      title: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili',
      titleTemplate: '%s - 哔哩哔哩 (゜-゜)つロ 干杯~-bilibili',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: '哔哩哔哩（bilibili.com)是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。',
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

  image: {
    // Options
  },
  

  // target: 'static',

  // modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
  ],

  // experimental features
  // experimental: {
  //   reactivityTransform: false,
  // },

  // auto import components
  components: true,

  nitro: {
    devProxy: {
      '/proxy/api': {
        target: 'https://api.bilibili.com',
        changeOrigin: true,
      },
      '/proxy/search': {
        target: 'https://s.search.bilibili.com',
        changeOrigin: true,
      },
    }
  }

})
