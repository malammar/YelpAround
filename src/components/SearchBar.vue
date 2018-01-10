<template>
  <div class="search-bar">
    <form v-on:submit.prevent="searchYelp">
      <input type="search" name="search-text" v-model="term">
      within
      
      <select name="distance" v-model="radius">
        <option v-for="distance in distanceOptions" :value="distance">{{distance}} mile</option>
      </select>
      of
      <input type="text" name="zipcode" pattern="[0-9]{5}" title="5 digit zip code" v-model="zipcode">
      
      <button v-on:click="searchYelp">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      placeholder: 'Find',
      term: '',
      zipcode: '',
      radius: 0,
      distanceOptions: [1, 3, 5, 8, 13]
    }
  },
  methods: {
    searchYelp () {
      this.$router.push({
        path: 'search',
        query: {
          term: this.term,
          radius: this.radius,
          location: this.zipcode
        }
      })
    }
  }
}
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>


</style>
