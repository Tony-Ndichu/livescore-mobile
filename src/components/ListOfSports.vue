<template>
  <div class="sport-list">
    <v-card
      v-for="sport in listOfSports"
      :key="sport.betradar_id"
      :class="currentSportId == sport.betradar_id ? 'single-sport active' : 'single-sport'"
      @click="setCurrentSport(sport.betradar_id, sport.sport_name)"
    >
      <img
        :src="sport.icon"
        :alt="sport.sport_name"
        class="sport-icon"
      >
      <div class="name">
        {{ sport.sport_name }}
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ListOfSports',
  data: () => ({
    sports: [],
  }),
  computed: {
    listOfSports() {
      return this.$store.getters.getSports;
    },
    currentSportId() {
      return this.$store.getters.getCurrentSportId;
    },
  },
  mounted() {
    this.$store.dispatch('getSports');
  },
  methods: {
    setCurrentSport(betradarId, name) {
      this.$store.dispatch('setCurrentSport', { betradarId, name });
    },
  },

};
</script>

<style scoped>


</style>
