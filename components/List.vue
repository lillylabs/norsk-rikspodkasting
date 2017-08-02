<template>
  <section>
    <div class="columns is-gapless is-multiline">
      <div class="column is-4 is-3-desktop" v-for="(podcast, index) of []" :key="index">
        <a class="image is-square ">
          <img :src="podcast.cover ">
        </a>
      </div>
    </div>
  </section>
</template>

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

