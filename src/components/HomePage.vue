<template>
  <div class="home-page">
    <h1>{{title}}</h1>
    <h2>{{subtitle}}</h2>

    <search-bar></search-bar>
    <h3>Or</h3>
    <a href="/favorites">Go to Your Favorites</a>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import gql from 'graphql-tag'

export default {
  name: 'HomePage',
  components: {
    SearchBar
  },
  apollo: {
    businessList: gql`{
      business(id: "garaje-san-francisco") {
        name
        id
        rating
        url
      }
    }`
  },
  data () {
    return {
      title: 'YelpAround',
      subtitle: 'Find businesses around you using Yelp\'s API.',
      businessList: []
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
