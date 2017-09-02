<template>
  <transition name="fade">
    <img v-if="imageSrc" :src="imageSrc" />
  </transition>
</template>

<script>

export default {
  props: [
    'src'
  ],
  data() {
    return {
      imageSrc: null
    }
  },
  mounted() {
    let image = new Image()
    image.src = this.src
    image.onload = () => {
      this.imageSrc = this.src
    }
  }
}
</script>


<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 250ms ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

