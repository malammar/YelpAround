<template>
  <div class="favorites">
    <h1><router-link to="/">{{title}}</router-link></h1>

    <search-bar></search-bar>

    <ul v-if="favoritesList.length">
      <li v-for="business in favoritesList" v-if="business">
        {{business.name}}
        <button v-on:click="toggleFavorite(business)">
          {{favorites.isFavorite(business) ? '&#9733;' : '&#9734;'}}
        </button>
      </li>
    </ul>
    <span v-if="!favoritesList.length">
      No favorites found.
    </span>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import Favorites from '../utils/favorites.js'

export default {
  name: 'FavoritesList',
  components: {
    SearchBar
  },
  data () {
    return {
      title: 'YelpAround',
      subtitle: 'Find businesses around you using Yelp\'s API.',
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
  },
  computed: {
    favoritesList: function () {
      return Object.values(this.favorites.get())
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
