<template>
  <div class="search-page">
    <h1><router-link to="/">{{title}}</router-link></h1>
    <h2>{{subtitle}}</h2>

    <search-bar></search-bar>

    <ul v-if="search.business">
      <li v-for="business in search.business">
        {{business.name}}
        <button v-on:click="toggleFavorite(business)">
          {{favorites.isFavorite(business) ? '&#9733;' : '&#9734;'}}
        </button>
      </li>
    </ul>
    <div class="loading" v-if="isLoading">
      <img src="/assets/loader.gif" /> Loading...
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import gql from 'graphql-tag'
import Favorites from '../utils/favorites.js'

export default {
  name: 'SearchPage',
  components: {
    SearchBar
  },
  apollo: {
    $loadingKey: 'isLoading',
    search: {
      query () {
        if (this.term && this.location && this.radius) {
          return gql`query searchYelp($term: String!, $location: String!, $radius: Float!) {
            search(term: $term, location: $location, radius: $radius) {
              total
              business {
                name
                id
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
      search: {},
      isLoading: 0,
      favorites: new Favorites(),
      toggleFavorite: (business) => {
        if (this.favorites.isFavorite(business)) {
          this.favorites.remove(business)
        } else {
          this.favorites.add(business)
          this.favorites = new Favorites()
        }
      }
    }
  }
}
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style: none;
}

</style>
