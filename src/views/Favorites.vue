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
import { groupByTournament } from '../utils';
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
  mounted() {
    const favoriteGames = JSON.parse(localStorage.getItem('favoriteGamesArray'));
    // this.arrayOfFavoriteGames = favoriteGames;

    const groupedByTournament = groupByTournament(favoriteGames);
    const arrayOfGamesPerSport = [];

    Object.keys(groupedByTournament).forEach((key) => {
      arrayOfGamesPerSport.push({
        nameOfTournament: key,
        gamesInTournament: groupedByTournament[key],
      });
      this.arrayOfFavoriteGames = arrayOfGamesPerSport;
    });
  },
};
</script>
