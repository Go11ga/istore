export default {
  head: {
    title: 'ishop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Интернет магазин' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  serverMiddleware: [
    // '~~/serverMiddleware/headers'
  ],

  loading: { color: '#ddd' },

  css: [
    'normalize.css',
    'element-ui/lib/theme-chalk/index.css'
    // './assets/scss/global-styles.scss'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: ['@/assets/scss/style.scss']
  },

  axios: {},

  plugins: [
    '@/plugins/globals',
    '~/plugins/vue-agile.js',
    '~/plugins/vue-yandex-maps'
  ],

  build: {
    transpile: [/^element-ui/, 'vue-agile']
  },

  env: {
    appName: 'ishop'
  }
}
