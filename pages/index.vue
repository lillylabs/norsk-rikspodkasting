<template>
  <section>
    <div class="catalog">
      <div class="item" v-for="(id, index) of $store.state.podcasts.ids" :key="index">
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
.catalog {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;

  .item {
    width: 33.33%;
    padding: 0.5rem;
  }
}

@media (min-width: 568px) {
  .catalog {
    .item {
      width: 25%;
    }
  }
}

@media (min-width: 876px) {
  .catalog {
    margin: -1.25vw;

    .item {
      width: 33.33%;
      padding: 1.25vw;
    }
  }
}

header {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.image {
  transition: all 250ms ease-out;

  &:hover {
    filter: grayscale(100%) brightness(90%);
  }
}
</style>
