export const state = () => ({
  ids: [],
  meta: {},
  episodes: {}
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
  }
}
