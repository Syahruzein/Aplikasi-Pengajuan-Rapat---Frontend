import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - aplikasi pengajuan rapat',
    title: 'apr',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/apr.svg' }
    ]
  },

  ssr: false, // Disable Server Side rendering

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/gradient-color.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/aos", mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',

    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // Simple usage
    'cookie-universal-nuxt',
  ],

  // moment: {
  //   locales: ['id']
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost:3000',
  },
  // auth: {
  //   strategies: {
  //     local: {

  //     },
  //   },
  // },

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: 'http://localhost:8080/api/auth/signin', method: 'post', propertyName: 'data.token' },
  //         user: { url: 'http://localhost:8080/api/test/user', method: 'get', propertyName: 'data' },
  //         dir: { url: 'http://localhost:8080/api/test/dir', method: 'get', propertyName: 'data' },
  //         admin: { url: 'http://localhost:8080/api/test/admin', method: 'get', propertyName: 'data' },
  //         logout: false
  //       },
  //       tokenType: ''
  //     }
  //   }
  // },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
  
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
