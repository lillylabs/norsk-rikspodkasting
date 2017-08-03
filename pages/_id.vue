<template>
  <article>
    <section class="section">
      <div class="container">
        <h1 class="title">Section</h1>
        <h2 class="subtitle">
          A simple container to divide your page into
          <strong>sections</strong>, like the one you're currently reading
        </h2>
      </div>
    </section>
  </article>
</template>

<script>

export default {
  components: {

  },
  fetch({ store, params }) {
    // store.dispatch('fetchEpisodes', params.id)
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 2rem;
}
</style>
