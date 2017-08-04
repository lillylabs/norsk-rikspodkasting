const contentful = require('contentful')

module.exports = {
  env: {
    contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'fb79fd325ae791321424da9f8690625825d9e0d294b094ba23a8ba4237f8395b',
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID || 'afonij0ohzso'
  },
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
      const client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: process.env.CONTENTFUL_SPACE_ID || 'afonij0ohzso',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'fb79fd325ae791321424da9f8690625825d9e0d294b094ba23a8ba4237f8395b'
      })

      return client.getEntries({
        content_type: 'podcast'
      })
        .then((response) => {
          return response.items.map((item) => item.fields.id)
        })
        .then((ids) => {
          return ids.map((id) => {
            return '/' + id
          })
        })
    }
  },
  /*
  ** Build configuration
  */
  build: {
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
