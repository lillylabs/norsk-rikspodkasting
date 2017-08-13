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
    // console.log('remove', id)
  },
  addMeta(state, { id, meta }) {
    state.meta[id] = Object.assign({}, state.meta[id], meta)
    // console.log('meta', id)
  },
  addEpisodes(state, { id, episodes }) {
    // console.log('episodes', id)
    state.episodes[id] = episodes
  },
  setStatus(state, { id, status }) {
    state.status[id] = status
  }
}

export const actions = {
  init({ commit }, payload) {
    const ids = payload.map(({ id, meta, episodes }) => {
      commit('addMeta', { id, meta })
      commit('addEpisodes', { id, episodes })
      commit('setStatus', { id, status: 'INITIAL' })
      return id
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
