import createLogger from 'vuex/dist/logger'
const data = require('~/helpers/data.js')

export const state = () => ({
  counter: 0
})

export const mutationss = {
  increment(state) {
    state.counter++
  }
}

export const actions = {
  nuxtServerInit({ commit, dispatch, state }, { req, payload, params }) {
    if (payload) {
      return dispatch('podcasts/init', payload)
    } else {
      return data.initialData()
    }
  }
}

export const plugins = process.env.NODE_ENV !== 'production' ? [createLogger()] : []
