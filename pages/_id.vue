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
        <p class="menu-label">
          Episoder
        </p>
        <ul class="menu-list">
          <a v-for="episode of episodes" :key="episode.guid">
            <div class="date">
              <span class="day">{{ episode.pubDate | formatDate('D.') }}</span>
              <span class="month">{{ episode.pubDate | formatDate('MMM') }}</span>
            </div>
            <div>
              <span>{{ episode.title }}</span>
            </div>
  
            <button class="button is-primary is-outline is-small">
              <span class="icon is-small">
                <i class="fa fa-play"></i>
              </span>
            </button>
          </a>
        </ul>
        <p class="menu-label" v-if="status !== 'COMPLETE'">
          Laster flere episoder ...
        </p>
      </nav>
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex'

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
    })
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
  a {
    display: flex;
    align-items: center;
    border-bottom: 1px solid hsl(0, 0%, 96%);
    padding: 0;

    >* {
      margin: 0.75rem;
    }
  }

  .button {
    margin-left: auto !important;
  }

  .icon.is-small {
    height: 1rem;
    width: 1rem;
  }
}
</style>
