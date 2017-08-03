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
          <p class="">{{ $store.state.podcasts.meta[$route.params.id].description }}</p>
        </div>
      </div>
      <nav class="panel">
        <a class="panel-block" v-for="episode of $store.state.podcasts.episodes[$route.params.id]" :key="episode.guid">
          <span class="panel-icon">
            <i class="fa fa-book"></i>
          </span>
          {{ episode.title }}
        </a>
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
</style>
