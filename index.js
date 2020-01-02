import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight, faHome, faSearch, faBars, faTimes, faFilter, faGlobeAfrica, faCalendarAlt, faFutbol, faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CountryFlag from 'vue-country-flag';
// import VCalendar from 'v-calendar';
import Sticky from 'vue-sticky-directive';
import Main from './Main.vue';
import router from './src/router';
import store from './src/store';
import vuetify from './src/plugins/vuetify';

library.add(faAngleRight, faHome, faSearch, faBars, faTimes, faFilter, faGlobeAfrica, faCalendarAlt, faFutbol, faStar);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('country-flag', CountryFlag);
Vue.use(Sticky);

new Vue({
  vuetify,
  store,
  router,
  render: (createEl) => createEl(Main),
}).$mount('#app');
