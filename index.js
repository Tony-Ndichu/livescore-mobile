import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleRight, faHome, faSearch, faBars, faTimes, faFilter, faGlobeAfrica, faCalendarAlt, faFutbol, faStar, faCaretDown, faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon, FontAwesomeLayers,
  FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome';
import CountryFlag from 'vue-country-flag';
// import VCalendar from 'v-calendar';
import Sticky from 'vue-sticky-directive';
import Main from './Main.vue';
import router from './src/router';
import store from './src/store';
import vuetify from './src/plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


library.add(faAngleRight, faHome, faSearch, faBars, faTimes, faFilter, faGlobeAfrica, faCalendarAlt, faFutbol, faStar, faCaretDown, faCaretUp);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

Vue.component('country-flag', CountryFlag);
Vue.use(Sticky);

new Vue({
  vuetify,
  store,
  router,
  render: (createEl) => createEl(Main),
}).$mount('#app');
