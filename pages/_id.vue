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
          <p>{{ $store.state.podcasts.meta[$route.params.id].label.name }}</p>
          <p>
            <a :href="$store.state.podcasts.meta[$route.params.id].link">Hjemmeside</a>
          </p>
          <p class="">{{ $store.state.podcasts.meta[$route.params.id].description }}</p>
        </div>
      </div>
    </section>
    <section>
      <nav class="menu">
        <p class="menu-label">
          2017
        </p>
        <ul class="menu-list">
          <a v-for="episode of $store.state.podcasts.episodes[$route.params.id]" :key="episode.guid">
            <span>{{ episode.title }}</span>
            <span class="has-text-grey">({{ episode.pubDate }})</span>
  
            <button class="button is-primary is-outline is-small">
              <span class="icon is-small">
                <i class="fa fa-play"></i>
              </span>
            </button>
          </a>
        </ul>
      </nav>
    </section>
  </article>
</template>

<script>

export default {
  components: {

  },
  fetch({ store, params }) {
    store.dispatch('fetchEpisodes', params.id)
    return { test: params.id }
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

      +* {
        margin-left: 0;
      }
    }
  }

  .button {
    margin-left: auto;
  }

  .icon.is-small {
    height: 1rem;
    width: 1rem;
  }
}
</style>
