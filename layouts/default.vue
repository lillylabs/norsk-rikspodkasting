<template>
  <div class="app">
    <div class="background"></div>

    <header>
      <nuxt-link to="/" href="" class="button is-large is-primary" title="Forside">Norsk Rikspodkasting</nuxt-link>
      <br/>
      <nuxt-link to="/info" href="" class="button is-primary" title="Om Norsk Rikspodkasting">
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
.background {
  background-image: url('/hero-alt.jpg');
  background-size: cover;
  background-position: left top;

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
  border: 0 solid hsl(0, 0%, 96%);
  border-top-width: 1px;
  background: hsl(0, 0%, 96%);
  padding-bottom: 48px; // room for player
  article {
    background: white;
    padding: 2rem;
    padding-top: 3rem;
  }
}

.player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;

  margin: 0 !important;

  z-index: 10;
}

@media (min-width: 876px) {
  header {
    z-index: 1;
  }

  .player {
    width: 35vw;
  }

  .background {
    width: 35vw;
  }

  main {
    padding: 5vw;
    margin-top: 0;
    margin-left: 35vw;
    overflow-y: scroll;
    border-top-width: 0;
    border-left-width: 1px;

    article {
      padding: 4.5vw;
    }
  }
}
</style>
