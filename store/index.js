import createLogger from 'vuex/dist/logger'
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
  nuxtServerInit({ commit, dispatch }, { req }) {
    return data.podcastIds()
      .then((ids) => {
        commit('podcasts/addIds', ids)
        return ids
      })
      .then((ids) => {
        // return dispatch('podcasts/loadAll')
      })
  }
}

export const plugins = process.env.NODE_ENV !== 'production' ? [createLogger()] : []
