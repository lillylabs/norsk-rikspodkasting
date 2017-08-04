<template>
  <section>
    <div class="columns is-gapless is-multiline">
      <div class="column is-4 is-3-desktop" v-for="(id, index) of $store.state.podcasts.ids" :key="index">
        <nuxt-link :to="id" class="image is-square">
          <img :src="$store.state.podcasts.meta[id].cover.large">
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {

  },
  fetch({ store, isServer }) {
    if (!store.state.podcasts.allIsLoaded) {
      return store.dispatch('podcasts/loadAll')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.image {
  filter: grayscale(100%);
  opacity: 0.75;

  &:hover {
    filter: none;
    opacity: 1;
  }
}
</style>
