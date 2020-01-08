<template>
  <div>
    <Banner />
    <ListOfSports />
    <SideMenu />
    <Games
      :array-of-games-per-sport="arrayOfFavoriteGames"
    />
  </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import SideMenu from '../components/SideMenu.vue';
import Games from '../components/Games.vue';
import { groupByTournament, filterByFavorites } from '../utils';
import ListOfSports from '../components/ListOfSports.vue';

export default {
  name: 'Favorites',
  components: {
    Banner,
    SideMenu,
    Games,
    ListOfSports,
  },
  data: () => ({
    arrayOfFavoriteGames: [],
  }),
  computed: {
    myFetchedGames() {
      return this.$store.getters.getGamesForSingleSport;
    },
  },
  watch: {
    myFetchedGames(newValue) {
      const filteredByFavorites = filterByFavorites(newValue);
      const groupedByTournament = groupByTournament(filteredByFavorites);
      const arrayOfGamesPerSport = [];

      Object.keys(groupedByTournament).forEach((key) => {
        const value = groupedByTournament[key];
        arrayOfGamesPerSport.push({
          nameOfTournament: key,
          gamesInTournament: value,
        });
        this.arrayOfFavoriteGames = arrayOfGamesPerSport;
      });
    },
  },
  mounted() {
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
  },
};
</script>
