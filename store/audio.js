import Vue from 'vue'

export const state = () => ({
  src: null,
  play: true,
  seek: 0,
  status: 'PAUSED', // PAUSED, PLAYING, LOADING, ERROR
  time: 0,
  played: {
    // [src]: {
    //  time:
    //  lastPlayed:
    // }
  }
})

export const mutations = {
  paused(state) {
    state.status = 'PAUSED'
  },
  playing(state) {
    state.status = 'PLAYING'
  },
  loading(state) {
    state.status = 'LOADING'
  },
  error(state) {
    state.status = 'ERROR'
  },
  time(state, time) {
    // state.time = time
    Vue.set(state.played, state.src, { time, lastPlayed: new Date() })
  },
  toggleAudio(state, src) {
    if (state.src === src) {
      state.play = !state.play
    } else {
      state.src = src
      state.play = true
    }
  }
}

export const actions = {
  toggleAudio({ commit }, src) {
    commit('toggleAudio', src)
  }
}

export const getters = {
  audioSrc: (state) => state.src,
  isAudioSrc: (state, getters) => (src) => {
    return getters.audioSrc === src
  },
  time: (state) => (src) => {
    return state.played[src] ? state.played[src].time : 0
  },
  isPlaying: (state, getters) => (src) => {
    return getters.isAudioSrc(src) && state.status === 'PLAYING'
  },
  isLoading: (state, getters) => (src) => {
    return getters.isAudioSrc(src) && state.status === 'LOADING'
  },
  isPaused: (state, getters) => (src) => {
    return getters.isAudioSrc(src) ? state.status === 'PAUSED' : true
  },
  isError: (state, getters) => (src) => {
    return getters.isAudioSrc(src) && state.status === 'ERROR'
  }
}
