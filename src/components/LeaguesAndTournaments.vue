<template>
  <div>
    <div class="tournament-banner">
      TOURNAMENTS
    </div>
    <div
      v-if="Object.entries(tournamentNames).length !== 0"
      class="tournament-list"
    >
      <div
        v-for="(tournament, index) in tournamentNames"
        :key="index"
        class="tournament-name"
        @click="sortByTournament(index)"
      >
        {{ tournament[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaguesAndTournaments',
  props: ['tournamentNames'],
  mounted() {
  },
  methods: {
    sortByTournament(tournamentBetradarId) {
      // if the categoryId is 0 (default for "all"), simply fetch all games for the sport rather than filter by category

      if (this.$route.name !== 'home' || this.$route.name !== 'live') {
        this.$router.push('/');
      }
      if (tournamentBetradarId == 0) {
        this.$store.dispatch('setFilteringByTournamentId', false);
        this.$store.dispatch('setTournamentId', 0);
        this.$store.dispatch('getGamesForSingleSport');
      } else {
        this.$store.dispatch('setSortingByTournament', { tournamentId: tournamentBetradarId, isTrue: true });
      }

      setTimeout(() => { this.$store.dispatch('toggleSideMenu'); }, 150);
    },
  },
};
</script>

<style scoped>
.tournament-banner {
    width: 100%;
    padding: 10px 0 10px 40px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    color: white;
    background-color:#2D2F92;
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
}

.tournament-list {
    padding-left: 50px;
    padding-top: 10px;
}

.tournament-name {
    padding: 5px;
    margin: 2px 2px 10px 2px;
}
</style>
