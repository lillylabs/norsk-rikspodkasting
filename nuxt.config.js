const data = require('./helpers/data.js')
const podcastIds = require('./data/podcasts.production.json')

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
    ],
    script: [
      { src: 'https://use.fortawesome.com/1d274b44.js' }
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
    { src: '~/assets/main.scss', lang: 'scss' }
  ],
  vendor: [
    'axios',
    'date-fns'
  ],
  plugins: [
    '~/plugins/filters.js',
    { src: '~/plugins/ga.js', ssr: false }
  ],
  generate: {
    routes: function () {
      return data.initialData(podcastIds)
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
      plugins: [
        'transform-es2015-modules-commonjs'
      ]
    },
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
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
