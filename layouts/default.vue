<template>
  <div>
    <div class="left is-dark">
      <h1>
        <nuxt-link to="/" href="" class="button is-large is-primary">Norsk Rikspodkasting</nuxt-link>
      </h1>
      <player></player>
    </div>
    <div class="right">
      <nuxt/>
    </div>
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
$sidebar: 35vw;

.left {
  background-image: url('/hero-alt.jpg');
  background-size: cover;
  background-position: left top;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  width: $sidebar;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right {
  margin-left: $sidebar;
  min-height: 100vh;
}
</style>
