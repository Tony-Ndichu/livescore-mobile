import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Match from '../views/Match.vue';
import Favorites from '../views/Favorites.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/live',
      name: 'live',
      component: Home,
    },
    {
      path: '/match/:id',
      name: 'match',
      component: Match,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
    },
  ],
});
