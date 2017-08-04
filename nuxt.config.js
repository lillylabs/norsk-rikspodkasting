const data = require('./helpers/data.js')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'NRP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Lytt til norskspråklige podkaster' }
    ],
    link: [
      { rel: 'icon', type: 'image/jpeg', href: '/hero.jpg' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f36c00' },
  /*
  ** Include css not in components
  */
  css: [
    // node.js module but we specify the pre-processor
    { src: '~assets/main.scss', lang: 'scss' },
    // { src: 'bulma/bulma.sass', lang: 'sass' },
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' },
  ],
  vendor: [
    'contentful',
    'axios'
  ],
  generate: {
    routes: function () {
      return data.initialData()
        .then((data) => {
          var routes = data.map(({ id, json }) => {
            return {
              route: '/' + id,
              payload: data
            }
          })
          routes.push({
            route: '/',
            payload: data
          })
          return routes
        })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: ['transform-es2015-modules-commonjs']
    },
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
