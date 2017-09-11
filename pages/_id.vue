<template>
  <article>
    <header>
      <div>
        <figure class="image is-square">
          <img :src="meta.cover.large"></img>
        </figure>
      </div>
      <div>
        <h1 class="title">
          <span>{{ meta.title }}</span>
        </h1>
        <p class="subtitle">
          <a :href="meta.link" target="_blank">{{ meta.label.name }}</a>
        </p>
      </div>
    </header>
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
                  <button class="button is-primary is-outline is-small" :class="{ 'is-loading': isLoading(episode.enclosure.link) }" @click.stop="toggleAudio(episode.enclosure.link)">
                    <span class="icon is-small">
                      <i class="fa" :class="{ 'fa-play': isPaused(episode.enclosure.link), 'fa-pause': isPlaying(episode.enclosure.link), 'fa-exclamation-triangle': isError(episode.enclosure.link) }"></i>
                    </span>
                  </button>
                </div>
              </header>
              <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div class="description" v-if="selectedEpisodeGuid === episode.guid">
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
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {

  },
  data() {
    return {
      id: this.$route.params.id,
      selectedEpisodeGuid: null,
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
    ...mapGetters('audio', [
      'isPlaying',
      'isPaused',
      'isLoading',
      'isError'
    ]),
    episodeYears() {
      return Object.keys(this.episodesByYear).sort((a, b) => a > b ? -1 : 1)
    },
    episodesByYear() {
      return this.episodes.reduce((sorted, episode) => {
        const date = new Date(String(episode.pubDate))
        const year = date.getFullYear()
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
    ...mapActions('audio', [
      'toggleAudio'
    ]),
    selectEpisode(guid) {
      this.selectedEpisodeGuid = this.selectedEpisodeGuid === guid ? null : guid
    },
    beforeEnter(el) {
      el.style.height = '0px'
      el.style.overflow = 'hidden'
    },
    enter(el, done) {
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
    leave(el, done) {
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
@import "~assets/utilities";

article>header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $white;

  @media (min-width: $sidebar-min) {
    border: 1px solid $white;
  }

  >*:first-child {
    width: calc(33.33% - 2.5vw);
    flex: 0 0 auto;
    border-right: 1px solid $white;
    margin-right: 2.5vw;
  }
}

.playlist {
  $dateWidth: 4rem;

  .playlist-label {
    color: $text-light;
    font-size: 0.75em;
    letter-spacing: 0.1em;
    text-align: center;

    margin-top: 1.5rem;
    margin-bottom: 1rem;

    width: $dateWidth;
  }

  .playlist-items>* {
    border-top: 1px solid $light;
    padding: 1rem 0;
    background: white;

    &:last-child {
      border-bottom: 1px solid $white;
    }

    &:hover {
      background-color: $background;
      border-color: $white;
      color: $text-strong;
      cursor: pointer;
    }

    >header {
      display: flex;
      align-items: center;
      color: $text;

      >:last-child {
        margin-right: 1rem;
      }

      .date,
      .meta {
        flex: 0 0 auto;
      }

      .meta {
        margin-right: 1rem;
      }

      .info {
        flex: 1 1 auto;
      }

      .actions {
        .button {
          height: 2rem;
          width: 2rem;
        }
      }

      .title {
        span {
          line-height: 1;
        }
      }

      .date {
        width: $dateWidth;
        font-size: 0.8rem;

        span {
          display: block;
          line-height: 1rem;
          text-align: center;
        }
      }
    }

    .content {
      margin: 0 $dateWidth;
      padding-top: 0.5rem;

      /deep/ img {
        display: none;
      }

      /deep/ strong {
        color: currentColor;
        font-weight: 600;
      }
    }
  }
}
</style>
