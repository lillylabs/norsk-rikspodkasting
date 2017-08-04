import data from '~/helpers/data.js'

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
    return data.podcastIds()
      .then((ids) => {
        commit('podcasts/addIds', ids)
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
