<template>
  <div class="home">
    <h1><router-link to="/">{{title}}</router-link></h1>
    <h2>{{subtitle}}</h2>

    <search-bar></search-bar>
    <h3>Or</h3>
    <router-link to="/favorites">Go to Your Favorites</router-link>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'

// eslint-disable-next-line
import Router from 'vue-router'

export default {
  name: 'Home',
  components: {
    SearchBar
  },
  data () {
    return {
      title: 'YelpAround',
      subtitle: 'Find businesses around you using Yelp\'s API.'
    }
  }
}
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}

</style>
