<template>
  <section class="player is-gapless is-primary columns">
    <div class="column is-narrow">
      <a class="image is-48x48">
        <img :src="$store.state.podcasts.list[0].cover">
      </a>
    </div>
    <div class="column">
      <progress class="progress is-large" value="15" max="100">15%</progress>
    </div>
    <div class="column is-narrow">
      <a class="button is-primary is-outline">
        <span class="icon is-small">
          <i class="fa fa-play"></i>
        </span>
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.button {
  height: 100%;
  width: 48px;
}

.progress {
  height: 100%;
  border-radius: 0;
}
</style>

