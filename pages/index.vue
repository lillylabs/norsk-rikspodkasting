<template>
  <section class="catalog">
    <div class="item" v-for="(id, index) of $store.state.podcasts.ids" :key="index">
      <nuxt-link :to="id">
        <div class="image is-square">
          <lazy-image :src="$store.state.podcasts.meta[id].cover.large" />
        </div>
      </nuxt-link>
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

  .item {
    width: 33.33%;

    a {
      display: block;
    }
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
      width: 33.333333333%;
      flex: 0 0 33.33%;
      padding: 1.25vw;

      a {
        border: 1px solid white;
      }
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
  transition: filter 250ms ease-out;
  &:hover {
    filter: grayscale(100%) brightness(90%);
  } // Hack to make image stop jumping on hover
  transform: translate3d(0px, 0px, 0px);
}
</style>
