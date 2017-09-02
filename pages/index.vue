<template>
  <section>
    <div class="columns is-gapless is-multiline">
      <div class="column is-4 is-3-desktop" v-for="(id, index) of $store.state.podcasts.ids" :key="index">
        <nuxt-link :to="id">
          <div class="image is-square">
            <lazy-image :src="$store.state.podcasts.meta[id].cover.large" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>

import LazyImage from '~/components/LazyImage.vue'

export default {
  components: {
    LazyImage
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
  transition: all 250ms ease-out;
  filter: grayscale(100%);
  opacity: 0.75;

  &:hover {
    filter: none;
    opacity: 1;
  }
}
</style>
