<template>
  <article>
    <section class="section">
      <div class="content columns">
        <div class="column is-3">
          <figure class="image">
            <img :src="meta.cover.large"></img>
          </figure>
        </div>
        <div class="column">
          <h1>
            <span>{{ meta.title }}</span>
          </h1>
          <p>
            <a :href="meta.link" target="_blank">{{ meta.label.name }}</a>
          </p>
          <div v-html="meta.description"></div>
        </div>
      </div>
    </section>
    <section>
      <nav>
        <div v-for="year of episodeYears" :key="year" class="playlist">
          <p class="playlist-label">
            {{ year }}
          </p>
          <ul class="playlist-items">
            <li v-for="episode of episodesByYear[year]" :key="episode.guid" @click="selectEpisode(episode.guid)">
              <header>
                <div class="date">
                  <span class="day">{{ episode.pubDate | formatDate('D.') }}</span>
                  <span class="month">{{ episode.pubDate | formatDate('MMM') }}</span>
                </div>
                <div class="info">
                  <h2 class="title is-6 is-marginless">
                    <span>{{ episode.title }}</span>
                  </h2>
                </div>
                <div class="meta">
                  <span class="has-text-grey-light">{{ episode.enclosure.duration | formatTime }}</span>
                </div>
                <div class="actions">
                  <button class="button is-primary is-outline is-small">
                    <span class="icon is-small">
                      <i class="fa fa-play"></i>
                    </span>
                  </button>
                </div>
              </header>
              <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div class="description" v-if="selectedEpisode === episode.guid">
                  <div class="content has-text-grey-dark" v-html="episode.description || 'Ingen beskrivelse'"></div>
                </div>
              </transition>
            </li>
          </ul>
        </div>
        <p class="menu-label" v-if="status !== 'COMPLETE'">
          Laster flere episoder ...
        </p>
      </nav>
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  components: {

  },
  data() {
    return {
      id: this.$route.params.id,
      selectedEpisode: null,
      transition: 300
    }
  },
  computed: {
    ...mapState({
      meta(state) {
        return state.podcasts.meta[this.$route.params.id]
      },
      episodes(state) {
        return state.podcasts.episodes[this.id]
      },
      status(state) {
        return state.podcasts.status[this.$route.params.id]
      }
    }),
    episodeYears() {
      return Object.keys(this.episodesByYear).sort((a, b) => a > b ? -1 : 1)
    },
    episodesByYear() {
      return this.episodes.reduce((sorted, episode) => {
        const year = moment(String(episode.pubDate)).format('YYYY')
        if (sorted[year]) {
          sorted[year].push(episode)
        } else {
          sorted[year] = [episode]
        }
        return sorted
      }, {})
    }
  },
  methods: {
    selectEpisode(guid) {
      this.selectedEpisode = this.selectedEpisode === guid ? null : guid
      console.log(this.selectedEpisode)
    },
    beforeEnter: function (el) {
      el.style.height = '0px'
      el.style.overflow = 'hidden'
    },
    enter: function (el, done) {
      const clone = el.cloneNode(true)
      clone.style.width = el.style.width
      clone.style.visibility = 'hidden'
      clone.style.removeProperty('display')
      clone.style.removeProperty('height')
      el.parentNode.appendChild(clone)
      const height = clone.clientHeight
      clone.remove()

      el.style.height = height + 'px'
      el.style.transition = `height ${this.transition}ms ease-in-out`
      setTimeout(() => { done() }, this.transition)
      // done()
    },
    leave: function (el, done) {
      el.style.height = '0px'
      // done()
      setTimeout(() => { done() }, this.transition)
    }
  },
  mounted() {
    this.$store.dispatch('podcasts/fetchAllEpisodes', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 2rem;
}
</style>
