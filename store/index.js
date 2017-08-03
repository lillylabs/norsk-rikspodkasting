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
                const meta = {
                  name: response.data.results[0].collectionName,
                  description: response.data.results[0].description,
                  cover: {
                    tiny: response.data.results[0].artworkUrl30,
                    small: response.data.results[0].artworkUrl100,
                    large: response.data.results[0].artworkUrl600
                  },
                  feedUrl: response.data.results[0].feedUrl,
                  label: {
                    id: response.data.results[0].artistId,
                    name: response.data.results[0].artistName
                  },
                  categories: response.data.results[0].genreIds.map((id, index) => {
                    return {
                      id: id,
                      name: response.data.results[0].genres[index]
                    }
                  })
                }
                commit('podcasts/addMeta', { id: id, meta: meta })
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
  },
  fetchEpisodes({ commit, state }, id) {
    const feedUrl = state.podcasts.meta[id].feedUrl
    console.log('feed', feedUrl)
    axios.get('http://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl))
      .then((response) => {
        commit('podcasts/addMeta', { id: id, meta: response.data.feed })
        commit('podcasts/addEpisodes', { id: id, episodes: response.data.items })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
