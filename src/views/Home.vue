<template>
  <div>
    <div>
      <Banner />
      <div
        v-if="$route.path !== '/match'"
        id="sticky"
      >
        <Days v-if="$route.path !== '/live'" />
        <ListOfSports />
      </div>

      <DesktopSportList />

      <Games
        v-if="!loading"
        :array-of-games-per-sport="arrayOfGamesPerSport"
      />
      <div
        v-else
        class="spinner"
      />

      <NoGames v-if="!loading && noGamesAvailable" />

      <BottomNav />
    </div>
    <SideMenu />
    <Calendar />
  </div>
</template>

<script>
import { groupByTournament, addFavorites } from '../utils';
import Banner from '../components/Banner.vue';
import Days from '../components/Days.vue';
import ListOfSports from '../components/ListOfSports.vue';
import Games from '../components/Games.vue';
import BottomNav from '../components/BottomNav.vue';
import SideMenu from '../components/SideMenu.vue';
import DesktopSportList from '../components/DesktopSportList.vue';
import NoGames from '../components/NoGames.vue';
import Calendar from '../components/Calendar.vue';

export default {
  name: 'Home',
  components: {
    Banner,
    Days,
    ListOfSports,
    Games,
    BottomNav,
    SideMenu,
    DesktopSportList,
    NoGames,
    Calendar,
  },
  data: () => ({
    arrayOfGamesPerSport: [],
  }),
  computed: {
    loading() {
      return this.$store.getters.getLoadingState;
    },
    noGamesAvailable() {
      return this.$store.getters.getNoGamesAvailable;
    },
    myFetchedGames() {
      return this.$store.getters.getGamesForSingleSport;
    },
    myFavoriteGames() {
      return this.$store.getters.getFavoriteGames;
    },
  },
  watch: {
    loading(newValue) {
    },
    noGamesAvailable(newValue) {
    },
    myFetchedGames(newValue) {
      const addedFavoritedKey = addFavorites(newValue, this.myFavoriteGames);
      console.log('addedFavoritedKey==========>', addedFavoritedKey);
      const groupedByTournament = groupByTournament(addedFavoritedKey);
      const arrayOfGamesPerSport = [];

      Object.keys(groupedByTournament).forEach((key) => {
        const value = groupedByTournament[key];
        // console.log(`key=======>${key}, value===>${value[0]}`);

        arrayOfGamesPerSport.push({
          nameOfTournament: key,
          gamesInTournament: value,
        });
        this.arrayOfGamesPerSport = arrayOfGamesPerSport;
      });
    },
    myFavoriteGames(newValue) {
      console.log('new faves=====>', newValue);
    },
  },
  created() {
    if (this.$route.path === '/live') {
      this.$store.dispatch('setLiveGames', true);
    }

    // window.addEventListener('beforeunload', (event) => {
    //   event.returnValue = 'Sure you want to leave?';
    //   console.log('reloading');
    //   this.$store.dispatch('closeSideMenu');
    //   this.$$store.dispatch('setAlreadyFetchedCategories', false);
    //   this.$store.dispatch('setAlreadyFetchedTournamentNames', false);
    // });
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll(event));
    // this.$store.dispatch('setCategoryId', 0);
    this.$store.dispatch('getGamesForSingleSport');
    this.polling = setInterval(() => this.$store.dispatch('getGamesForSingleSport'), 10000);

    const top = document.getElementById('sticky').offsetTop;

    window.onscroll = () => {
      const y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      if (y >= top) {
        sticky.className = 'stick';
      } else {
        sticky.className = '';
      }
    };
  },
  destroyed() {
    clearInterval(this.polling);
    // window.removeEventListener('scroll', this.handleScroll(event));
  },
  methods: {
    getDistance() {
      const h = document.getElementById('sticky');

      const topDist = h.offsetTop;
      return topDist;
    },
  },
};
</script>

<style scoped>
#sticky {
    background-color: white;
    width: 100%;
}

.stick {
    z-index: 2;
    position: fixed;
    top: 0;
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
}

@keyframes sk-scaleout {
    0%{
        transform: scale(0);
    }

    100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
}
}
.spinner {
    display: block;
    width: 40px;
    height: 40px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 100%;
    -webkit-animation: sk-scaleout 1s infinite ease-in-out;
    animation: sk-scaleout 1s infinite ease-in-out;
}

/* Large devices (desktops, 992px and up */
@media only screen and (min-width: 992px) {

}

</style>
