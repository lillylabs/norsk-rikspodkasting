import axios from 'axios'

const contentful = require('contentful')

const ITUNES_LOOKUP = 'https://itunes.apple.com/lookup'

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: process.env.contentfulSpaceId,
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: process.env.contentfulAccessToken
    })

    return client.getEntries({
      content_type: 'podcast'
    })
      .then((response) => {
        var ids = response.items.map((item) => item.fields.id)
        commit('podcasts/addIds', ids)
        var promises = ids.map(id => {
          return axios.get(ITUNES_LOOKUP, {
            params: {
              id: id.replace('id', '')
            }
          })
            .then((response) => {
              if (response.data.resultCount !== 0) {
                commit('podcasts/addMeta', { id: id, meta: response.data.results[0] })
              } else {
                commit('podcasts/removeId', id)
              }
              return response
            })
        })

        return Promise.all(promises)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
