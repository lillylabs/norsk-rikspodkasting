module.exports = {
  env: {
    contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'fb79fd325ae791321424da9f8690625825d9e0d294b094ba23a8ba4237f8395b',
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID || 'afonij0ohzso'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
