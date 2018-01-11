<template>
  <div class="search-page">

    <search-bar></search-bar>

    <div v-if="search.business">
      <div class="filters">
          <b-dropdown text="Filter by category" class="m-md-2">
            <b-dropdown-item v-on:click="catFilter(search.business, '')">Clear</b-dropdown-item>
            <b-dropdown-item v-for="cat in categories" :key="cat.alias" v-on:click="catFilter(search.business, cat)">{{cat.title}}</b-dropdown-item>
          </b-dropdown>
          {{activeCatTitle}}
      </div>
    </div>

    <ul v-if="search.business">
      <li v-for="business in catFilter(search.business)">
        {{business.name}}
        <button v-on:click="toggleFavorite(business)">
          {{favorites.isFavorite(business) ? '&#9733;' : '&#9734;'}}
        </button>
      </li>
    </ul>
    <div class="loading" v-if="isLoading">
      <img src="../assets/loader.gif"> Loading...
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import gql from 'graphql-tag'
import Favorites from '../utils/favorites.js'
import {_} from 'vue-underscore'

// eslint-disable-next-line
import Router from 'vue-router'

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
                categories {
                  title
                  alias
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
      },
      result (res) {
        this.categories = []
        let catAliases = []
        for (let bus in res.data.search.business) {
          var cats = res.data.search.business[bus].categories
          for (let cat in cats) {
            if (!catAliases.includes(cats[cat].alias)) {
              this.categories.push(cats[cat])
              catAliases.push(cats[cat].alias)
            }
          }
        }
      }
    }
  },
  props: ['term', 'location', 'radius'],
  data () {
    return {
      search: {},
      isLoading: 0,
      favorites: new Favorites(),
      categories: [],
      activeCat: '',
      activeCatTitle: '',
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
  methods: {
    catFilter (busList, newActiveCat) {
      if (newActiveCat) {
        this.activeCat = newActiveCat.alias
        this.activeCatTitle = newActiveCat.title
      } else if (newActiveCat === '') {
        this.activeCat = this.activeCatTitle = newActiveCat
      }
      if (this.activeCat.length > 0) {
        let catFiler = this.activeCat
        return _.filter(busList, function (bus) {
          let busCategories = _.pluck(bus.categories, 'alias')
          return busCategories.includes(catFiler)
        })
      } else {
        return busList
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
