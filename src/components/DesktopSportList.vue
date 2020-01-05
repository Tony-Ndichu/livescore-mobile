<template>
  <div class="desktop-sidelist-container">
    <div class="desktop-sportlist">
      <div
        v-for="sport in listOfSports"
        :key="sport.betradar_id"
        :class="currentSport == sport.betradar_id ? 'single-sport-desktop active' : 'single-sport-desktop'"
        @click="setCurrentSport(sport.betradar_id)"
      >
        <img
          :src="sport.icon"
          :alt="sport.sport_name"
          class="sport-icon"
        >
        <div class="name">
          {{ sport.sport_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesktopSportList',
  data: () => ({
    sports: [],
  }),
  computed: {
    listOfSports() {
      return this.$store.getters.getSports;
    },
    currentSport() {
      return this.$store.getters.getCurrentSport;
    },
  },
  mounted() {
    this.$store.dispatch('getSports');
  },
  methods: {
    setCurrentSport(betradarId) {
      this.$store.dispatch('setCurrentSport', betradarId);
    },
  },

};
</script>

<style scoped>
.desktop-sidelist-container {
    display: block;
    float: left;
    clear: none;

}

.desktop-sportlist {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #333;
}

.single-sport-desktop {
    display: flex;
    flex-wrap: nowrap;
    padding: 8px;
    color: #f7f7f7;
    font-size: 12px;
}

/* Large devices (desktops, 992px and up */
@media only screen and (max-width: 992px) {
    .desktop-sportlist {
        display: none;
    }
}
</style>
