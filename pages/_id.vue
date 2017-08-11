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
          <h1>{{ meta.title }}</h1>
          <p>
            <a :href="meta.link">{{ meta.label.name }}</a>
          </p>
          <div v-html="meta.description"></div>
        </div>
      </div>
    </section>
    <section>
      <nav class="menu">
        <div v-for="year of episodeYears" :key="year">
          <p class="menu-label">
            {{ year }}
          </p>
          <ul class="menu-list">
            <a v-for="episode of episodesByYear[year]" :key="episode.guid">
              <div class="date">
                <span class="day">{{ episode.pubDate | formatDate('D.') }}</span>
                <span class="month">{{ episode.pubDate | formatDate('MMM') }}</span>
              </div>
              <div>
                <span>{{ episode.title }}</span>
              </div>
              <div>
                <span class="has-text-grey-light">{{ episode.enclosure.duration | formatTime }}</span>
              </div>
  
              <button class="button is-primary is-outline is-small">
                <span class="icon is-small">
                  <i class="fa fa-play"></i>
                </span>
              </button>
            </a>
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
      id: this.$route.params.id
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
  mounted() {
    this.$store.dispatch('podcasts/fetchAllEpisodes', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 2rem;
}

.date {
  font-size: 0.8rem;
  span {
    display: block;
    text-align: center;
  }
}

.menu {
  .menu-label {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
  }

  a {
    display: flex;
    align-items: center;
    border-bottom: 1px solid hsl(0, 0%, 96%);
    padding: 0;

    >* {
      margin: 0.75rem;
    }

    >*:nth-last-child(2) {
      margin-left: auto !important;
      font-size: 0.9rem;
      flex: 0 0 auto;
    }
  }

  .icon.is-small {
    height: 1rem;
    width: 1rem;
  }
}
</style>
