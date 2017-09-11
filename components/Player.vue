<template>
  <section v-if="current" class="player is-gapless is-mobile columns">
    <div class="column is-narrow">
      <nuxt-link :to="current.id" class="image is-48x48">
        <img :src="current.meta.cover.small">
      </nuxt-link>
    </div>
    <div class="column">
      <div class="is-dark">{{ current.episode.title }}</div>
      <progress class="progress is-large" :value="progress" max="100">{{ `${progress}%`}}</progress>
    </div>
    <div class="column is-narrow">
      <button class="button is-primary is-outline is-small" :class="{ 'is-loading': isLoading(audioSrc) }" @click.stop="toggleAudio(audioSrc)">
        <span class="icon">
          <i class="fa" :class="{ 'fa-play': isPaused(audioSrc), 'fa-pause': isPlaying(audioSrc), 'fa-exclamation-triangle': isError(audioSrc) }"></i>
        </span>
      </button>
    </div>
  </section>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      test: (state) => state.audio.time
    }),
    ...mapGetters([
      'current'
    ]),
    ...mapGetters('audio', [
      'time',
      'isPlaying',
      'isPaused',
      'isLoading',
      'isError'
    ]),
    audioSrc() {
      return this.current ? this.current.episode.enclosure.link : ''
    },
    audioDuration() {
      return this.current ? this.current.episode.enclosure.duration : ''
    },
    audioTime() {
      return this.time(this.audioSrc)
    },
    progress() {
      return this.current ? this.audioTime / this.audioDuration * 100 : 0
    }
  },
  methods: {
    ...mapActions('audio', [
      'toggleAudio'
    ])
  }
}
</script>


<style lang="scss" scoped>
@import "~assets/utilities";
img {
  transition: all 250ms ease-out;
  &:hover {
    filter: brightness(80%);
  }
}

.button {
  height: 100%;
  width: 48px;
}

.is-dark {
  padding: 0 0.5rem;
  font-size: 0.8rem;
  height: 28px;
  line-height: 28px;
  background: $dark;
  color: $light;
}

.progress {
  border-radius: 0;
  margin-bottom: 0;
  height: 20px;
}
</style>

