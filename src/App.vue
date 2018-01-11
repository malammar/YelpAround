<template>
  <div id="app">
    <b-container>
      <b-row align-v="center">
        <b-col>

          <div class="d-flex justify-content-center">
            <img src="./assets/logo.png" width="50" height="50">
            <h1><router-link to="/">{{title}}</router-link></h1>
            <span class="align-bottom">{{subtitle}}</span>
          </div>

          <hr>

          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'YelpAround',
      subtitle: 'Find businesses around you using Yelp\'s API.'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
