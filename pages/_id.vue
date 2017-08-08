<template>
  <article>
    <section class="section">
      <div class="content columns">
        <div class="column is-3">
          <figure class="image">
            <img :src="$store.state.podcasts.meta[$route.params.id].cover.large"></img>
          </figure>
        </div>
        <div class="column">
          <h1>{{ $store.state.podcasts.meta[$route.params.id].title }}</h1>
          <p>
            <a :href="$store.state.podcasts.meta[$route.params.id].link">{{ $store.state.podcasts.meta[$route.params.id].label.name }}</a>
          </p>
          <div v-html="$store.state.podcasts.meta[$route.params.id].description"></div>
        </div>
      </div>
    </section>
    <section>
      <nav class="menu">
        <p class="menu-label">
          Episoder
        </p>
        <ul class="menu-list">
          <a v-for="episode of $store.state.podcasts.episodes[$route.params.id]" :key="episode.guid">
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
        <p class="menu-label" v-if="$store.state.podcasts.status[$route.params.id] !== 'COMPLETE'">
          Laster flere episoder ...
        </p>
      </nav>
    </section>
  </article>
</template>

<script>
import moment from 'moment'
moment.locale('nb', {
  monthsShort: 'jan_feb_mars_april_mai_juni_juli_aug_sep_okt_nov_des'.split('_')
})

export default {
  components: {

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
