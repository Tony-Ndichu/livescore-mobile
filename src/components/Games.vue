<template>
  <div class="games-container">
    <Tournament
      v-if="!noGamesAvailable"
      :games="arrayOfGamesPerSport"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import { apiUrl } from '../utils';
import Tournament from './Tournament.vue';

export default {
  name: 'Games',
  components: {
    Tournament,
  },
  props: ['arrayOfGamesPerSport'],
  data: () => ({
    fetchedGames: [],
  }),
  computed: {
    currentSport() {
      return this.$store.getters.getCurrentSport;
    },
    noGamesAvailable() {
      return this.$store.getters.getNoGamesAvailable;
    },
    loading() {
      return this.$store.getters.getLoadingState;
    },
  },
  watch: {
    currentSport() {
      this.$store.dispatch('getGamesForSingleSport');
    },
    noGamesAvailable(newValue) {
    },
    loading(newValue) {
    },
  },
};
</script>

<style scoped>
/* Large devices (desktops, 992px and up */
.games-container {
  display: flex;
}
@media only screen and (min-width: 992px) {
    .games-container {
        width: 60%;
        float: left;
    }
}
</style>
