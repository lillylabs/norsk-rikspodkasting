<template>
  <section class="hero is-dark is-fullheight">
    <div class="is-overlay is-image"></div>
    <div class="hero-body">
      <div class="is-overlay is-border"></div>
      <div class="container">
        <header>
          <h1 class="button is-large is-primary"> Norsk Rikspodkasting</h1>
        </header>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.hero.is-dark {
  background-color: lightgray;
}

.hero .is-overlay.is-image {
  background-image: url('/hero.jpg');
  background-size: cover;
  background-position: right;
  mix-blend-mode: multiply;
}

.hero .is-overlay.is-border {
  top: 1rem;
  left: 1rem;
  bottom: 1rem;
  right: 1rem;
  border: 0.25rem solid #f36c00;
}

.button.is-primary {
  /* display: inline;
  padding: 1rem 1.5rem;
  font-weight: bold; */
  background: #f36c00;
  text-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.2);
}
</style>
