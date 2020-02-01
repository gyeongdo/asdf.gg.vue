module.exports = {
  head: {
    title: 'veneziar',
    meta: [{
      charset: 'utf-8',
    }, {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
    }, {
      'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
    }, {
      hid: 'desc', name: 'description', content: 'veneziar.com에 오신것을 환영합니다',
    }, {
      hid: 'ogtitle', name: 'og:title', content: 'Veneziar',
    }, {
      hid: 'ogdesc', name: 'og:description', content: 'veneziar.com에 오신것을 환영합니다',
    }, {
      hid: 'ogtype', property: 'og:type', content: 'website',
    }, {
      hid: 'ogimage', property: 'og:image', content: 'http://veneziar.com/vue-nodebird.png',
    }, {
      hid: 'ogurl', property: 'og:url', content: 'http://veneziar.com',
    }],
    link: [{ rel: 'shortcut icon', href: '/vue-nodebird.png' }],
  },
  modules: [
    '@nuxtjs/axios',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],
  moment: {
    locales: ['ko'],
  },
  build: {
    analyze: false,
    extend(config, { isClient, isServer, isDev }) {
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map';
      }
      console.log('webpack', config, isServer, isClient);
    },
  },
  vuetify: {},
  axios: {
    browserBaseURL: process.env.NODE_ENV === 'production' ? 'http://58.142.71.20' : 'http://58.142.71.20',
    // browserBaseURL: process.env.NODE_ENV === 'production' ? 'http://api.veneziar.com' : 'http://localhost:8080',
    
    baseURL: process.env.NODE_ENV === 'production' ? 'http://58.142.71.20' : 'http://58.142.71.20',
    // baseURL: process.env.NODE_ENV === 'production' ? 'http://api.veneziar.com' : 'http://localhost:8080',
    https: false,
  }, 
  server: {
    port: process.env.PORT || 3081,
  },
};
