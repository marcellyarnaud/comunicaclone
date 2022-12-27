<template>
  <div>
    <HomePage class="fundo" />
  </div>
</template>

<script>
import "../node_modules/fontawesome-free-v6/js/all";
import HomePage from './pages/HomePage.vue';

export default {
  name: 'App',
  components: {
    HomePage,
  }
}
</script>

<style>
.fundo {
  background: linear-gradient(to right,
      #f4f7f8 1.73%,
      #e1f4ff 36.14%,
      #ededfe 82.43%,
      #f3f3f3 100%);
  background-image: linear-gradient(to right,
      rgb(244, 247, 248) 1.73%,
      rgb(225, 244, 255) 36.14%,
      rgb(237, 237, 254) 82.43%,
      rgb(243, 243, 243) 100%);
  background-position-x: initial;
  background-position-y: initial;
  background-size: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
}
</style>
