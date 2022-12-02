<template>
  <div>
    <HomePage/>
  </div>
</template>

<script>
import "../node_modules/fontawesome-free-v6/js/all";
import HomePage from './components/HomePage.vue';

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
@import './assets/css/vendor/serpro-design-base.css';
@import './assets/css/app.css';
@import "../node_modules/fontawesome-free-v6/css/fontawesome.min.css";
</style>
