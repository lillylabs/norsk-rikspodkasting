import data from '~/helpers/data.js'

export const state = () => ({
  ids: [],
  meta: {},
  episodes: {},
  status: {}
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
  setStatus(state, { id, status }) {
    state.status[id] = status
  }
}

export const actions = {
  loadAll({ dispatch, state, commit }) {
    const promises = state.ids.map((id) => {
      return dispatch('loadPodcast', { id, episodeCount: 5 })
    })
    return Promise.all(promises)
      .then(() => {
        return commit('setStatus', { id: 'ALL', status: true })
      })
  },
  loadPodcast({ dispatch, commit }, { id, episodeCount }) {
    return dispatch('fetchMeta', id)
      .then(() => {
        return dispatch('fetchEpisodes', { id, episodeCount })
      })
      .then(() => {
        return commit('setStatus', { id, status: 'INITIAL' })
      })
  },
  fetchMeta({ commit }, id) {
    return data.iTunesLookUp(id)
      .then((meta) => {
        commit('addMeta', { id, meta })
      })
  },
  fetchEpisodes({ commit, state }, { id, episodeCount }) {
    const meta = state.meta[id]
    if (!meta) return

    return data.feedToJson(meta.feedUrl, episodeCount)
      .then((data) => {
        commit('addMeta', { id, meta: data.feed })
        commit('addEpisodes', { id, episodes: data.items })
      })
  },
  fetchAllEpisodes({ commit, dispatch }, id) {
    return dispatch('fetchEpisodes', { id, episodeCount: 200 })
      .then(() => {
        return commit('setStatus', { id, status: 'COMPLETE' })
      })
  }
}
