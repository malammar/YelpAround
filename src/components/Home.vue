<template>
  <div class="home">
    <h1>{{title}}</h1>
    <h2>{{subtitle}}</h2>

    <search-bar></search-bar>
    <h3>Or</h3>
    <a href="/favorites">Go to Your Favorites</a>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'

export default {
  name: 'Home',
  components: {
    SearchBar
  },
  data () {
    return {
      title: 'YelpAround',
      subtitle: 'Find businesses around you using Yelp\'s API.',
      search: []
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
