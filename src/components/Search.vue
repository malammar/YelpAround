<template>
  <div class="search-page">
    <h1>{{title}}</h1>
    <h2>{{subtitle}}</h2>

    <search-bar></search-bar>

    <ul v-if="search.business">
      <li v-for="business in search.business">{{business.name}}</li>
    </ul>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import gql from 'graphql-tag'

export default {
  name: 'SearchPage',
  components: {
    SearchBar
  },
  apollo: {
    search: {
      query () {
        if (this.term && this.location && this.radius) {
          return gql`query searchYelp($term: String!, $location: String!, $radius: Float!) {
            search(term: $term, location: $location, radius: $radius) {
              total
              business {
                name
                reviews {
                  text
                  rating
                  time_created
                  url
                }
              }
            }
          }`
        }
      },
      variables () {
        return {
          term: this.term,
          location: this.location,
          radius: this.radius * 1609.34
        }
      }
    }
  },
  props: ['term', 'location', 'radius'],
  data () {
    return {
      title: 'YelpAround',
      subtitle: 'Find businesses around you using Yelp\'s API.',
      search: {}
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
