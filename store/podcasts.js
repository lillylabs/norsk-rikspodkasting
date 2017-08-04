import data from '~/helpers/data.js'

export const state = () => ({
  ids: [],
  meta: {},
  episodes: {},
  allIsLoaded: false
})

export const mutations = {
  addIds(state, ids) {
    state.ids = ids
  },
  removeId(state, id) {
    state.ids = state.ids.filter(item => id !== item)
    console.log('remove', id)
  },
  addMeta(state, { id, meta }) {
    state.meta[id] = Object.assign({}, state.meta[id], meta)
    console.log('meta', id)
  },
  addEpisodes(state, { id, episodes }) {
    console.log('episodes', id)
    state.episodes[id] = episodes
  },
  allIsLoaded(state) {
    state.allIsLoaded = true
  }
}

export const actions = {
  loadAll({ dispatch, state, commit }) {
    const promises = state.ids.map((id) => {
      return dispatch('loadPodcast', { id, episodeCount: 20 })
    })
    return Promise.all(promises)
      .then(() => {
        commit('allIsLoaded')
      })
  },
  loadPodcast({ dispatch }, { id, episodeCount }) {
    return dispatch('fetchMeta', id)
      .then((id) => {
        if (id) {
          return dispatch('fetchEpisodes', { id, episodeCount })
        }
      })
  },
  fetchMeta({ commit }, id) {
    return data.iTunesLookUp(id)
      .then((meta) => {
        if (meta.hasOwnProperty('startsWith') && meta.startsWith('id')) {
          commit('removeId', id)
          return null
        } else {
          commit('addMeta', { id, meta })
          return id
        }
      })
  },
  fetchEpisodes({ commit, state }, { id, episodeCount }) {
    return data.feedToJson(state.meta[id].feedUrl, episodeCount)
      .then((data) => {
        commit('addMeta', { id, meta: data.feed })
        commit('addEpisodes', { id, episodes: data.items })
      })
  },
  fetchAllEpisodes({ commit, dispatch }, id) {
    return dispatch('fetchEpisodes', { id, episodeCount: 200 })
  }
}
