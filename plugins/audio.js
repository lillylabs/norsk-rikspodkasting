export const audio = store => {
  if (!process.browser) return

  const audio = new Audio()
  audio.waiting = () => store.commit('audio/loading')
  audio.onplaying = () => store.commit('audio/playing')
  audio.onpause = () => store.commit('audio/paused')
  audio.onerror = () => store.commit('audio/error')
  audio.ontimeupdate = () => store.commit('audio/time', audio.currentTime)

  store.subscribe((mutation, state) => {
    if (mutation.type === 'audio/toggleAudio') {
      if (state.audio.play) {
        audio.src = state.audio.src
        audio.currentTime = state.audio.played[state.audio.src] ? state.audio.played[state.audio.src].time : 0
        store.commit('audio/loading')
        audio.play()
      } else {
        audio.pause()
      }
    }
  })
}
