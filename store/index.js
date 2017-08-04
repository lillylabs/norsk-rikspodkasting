import data from '~/helpers/data.js'
const contentful = require('contentful')

export const state = () => ({
  counter: 0
})

export const mutationss = {
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
        return ids
      })
      .then((ids) => {
        var promises = ids.map(id => {
          return data.iTunesLookUp(id)
            .then(result => ({ id: id, meta: data.iTunesMetaTransformer(result) }))
        })
        return Promise.all(promises)
      })
      .then((results) => {
        var promises = results.map((result) => {
          if (result.hasOwnProperty('startsWith') && result.startsWith('id')) {
            commit('podcasts/removeId', result)
          } else {
            commit('podcasts/addMeta', result)
            return data.feedToJson(result.meta.feedUrl).then((data) => {
              commit('podcasts/addMeta', { id: result.id, meta: data.feed })
              commit('podcasts/addEpisodes', { id: result.id, episodes: data.items })
            })
          }
        })
        return Promise.all(promises)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  fetchEpisodes({ commit, state }, id) {
    // const feedUrl = state.podcasts.meta[id].feedUrl
    // data.feedToJson(feedUrl).then((data) => {
    //   commit('podcasts/addMeta', { id: id, meta: data.feed })
    //   commit('podcasts/addEpisodes', { id: id, episodes: data.items })
    // })
  }
}
