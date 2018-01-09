<template>
  <div class="search-bar">
    <input type="search" name="search-text">
    within
    <select name="distance">
      <option v-for="distance in distanceOptions" :value="distance">{{distance}} mile</option>
    </select>
    of
    <input type="text" name="zipcode" pattern="[0-9]{5}" title="5 digit zip code">
    <button>Search</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      placeholder: 'Find',
      distanceOptions: [1, 3, 5, 8, 13]
    }
  },
  methods: {
    searchYelp () {
      console.log('search')
    }
  }
}
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>


</style>
