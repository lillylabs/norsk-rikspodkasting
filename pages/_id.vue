<template>
  <article>
    <section class="section">
      <div class="content columns">
        <div class="column is-2">
          <figure class="image">
            <img :src="$store.state.podcasts.meta[$route.params.id].cover.large"></img>
          </figure>
        </div>
        <div class="column">
          <h1>{{ $store.state.podcasts.meta[$route.params.id].name }}</h1>
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
            <div>
              <span>{{ episode.title }}</span>
              <span class="has-text-grey">({{ episode.pubDate }})</span>
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

export default {
  components: {

  },
  mounted() {
    console.log('mounted')
    this.$store.dispatch('podcasts/fetchAllEpisodes', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 2rem;
}

.menu {
  a {
    display: flex;
    align-items: center;
    border-bottom: 1px solid hsl(0, 0%, 96%);
    padding: 0;

    >* {
      margin: 0.75rem;
      span+span {
        margin-left: 0.75rem;
      }

      +* {
        margin-left: 0;
      }
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
