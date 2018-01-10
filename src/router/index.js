import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FavoritesList from '@/components/FavoritesList'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/search',
    name: 'Search',
    component: Search,
    props: (route) => ({
      term: route.query.term || 'food',
      location: route.query.location || '92860',
      radius: route.query.radius || 3,
      categories: route.query.categories || '',
      limit: route.query.limit || '',
      offset: route.query.offset || ''
    })
  }, {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesList
  }]
})
