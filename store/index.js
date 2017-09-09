const data = require('~/helpers/data.js')
const podcastIds = require('~/data/podcasts.' + process.env.NODE_ENV + '.json')
import { audio } from '~/plugins/audio.js'

export const state = () => ({
  counter: 0
})

export const mutationss = {
  increment(state) {
    state.counter++
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch, state }, { req, payload, params }) {
    if (!payload) {
      payload = await data.initialData(podcastIds)
    }
    return dispatch('podcasts/init', payload)
  }
}

export const getters = {
  current(state, getters) {
    for (let podcastId of Object.keys(state.podcasts.episodes)) {
      const episodes = state.podcasts.episodes[podcastId] || []
      const episode = episodes.find((episode) => getters['audio/isAudioSrc'](episode.enclosure.link))
      if (episode) {
        return { meta: state.podcasts.meta[podcastId], episode, id: podcastId }
      }
    }
  }
}

export const plugins = [audio]
