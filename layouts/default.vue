<template>
  <div class="app">
    <div class="background"></div>

    <header>
      <nuxt-link to="/" class="button is-large is-primary" title="Forside">Norsk Rikspodkasting</nuxt-link>
      <br/>
      <nuxt-link to="/info" class="button is-primary" title="Om Norsk Rikspodkasting">
        <span class="icon">
          <i class="fa fa-info"></i>
        </span>
      </nuxt-link>
      <a href="https://www.facebook.com/norskrikspodkasting/" target="_blank" class="button is-primary" title="Facebookside">
        <span class="icon">
          <i class="fa fa-facebook"></i>
        </span>
      </a>

    </header>
    <player></player>
    <main>
      <nuxt/>
    </main>

  </div>
</template>

<script>

import Player from '~/components/Player.vue'

export default {
  components: {
    Player
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/utilities";

.background {
  background-image: url('/hero-alt.jpg');
  background-size: cover;
  background-position: left top;
  background-color: $dark;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  z-index: -1;
}

header {
  position: fixed;
  padding: 1rem;
  top: 0;
  left: 0;

  z-index: -1;
}

main {
  margin-top: 40vh;
  min-height: 60vh;
  border: 0 solid $light;
  border-top-width: 1px;
  background: $light;
  /* Room for player */
  padding-bottom: 48px;
}

.player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;

  margin: 0 !important;

  z-index: 10;
}

@media (min-width: $sidebar-min) {
  header {
    z-index: 1;
  }

  .player {
    width: $sidebar;
  }

  .background {
    width: $sidebar;
  }

  main {
    padding: $padding-large;
    margin-top: 0;
    margin-left: $sidebar;
    overflow-y: scroll;
    border-top-width: 0;
    border-left-width: 1px;
  }
}
</style>
