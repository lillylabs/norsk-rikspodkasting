const data = require('~/helpers/data.js')

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
  init({ commit }, payload) {
    const ids = payload.map(podcast => {
      commit('addMeta', { id: podcast.id, meta: podcast.json.feed })
      commit('addEpisodes', { id: podcast.id, episodes: podcast.json.items })
      commit('setStatus', { id: podcast.id, status: 'INITIAL' })
      return podcast.id
    })
    commit('addIds', ids)
  },
  fetchAllEpisodes({ commit, state }, id) {
    const meta = state.meta[id]
    if (!meta) return

    return data.feedToJson(meta.url, 200)
      .then((data) => {
        commit('addMeta', { id, meta: data.feed })
        commit('addEpisodes', { id, episodes: data.items })
        commit('setStatus', { id, status: 'COMPLETE' })
      })
  }
}
