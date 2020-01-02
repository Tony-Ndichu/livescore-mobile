<template>
  <div class="sport-list">
    <div
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
    </div>
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

.sport-list {
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
    padding-bottom: 10px;
    padding-top: 5px;
    padding-left: 3px;
    padding-left: 5px;
}

::-webkit-scrollbar {
    display: none;
}

.single-sport {
    min-width: 90px;
    border-radius: 5px;
    margin-right: 5px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.2);
    background-color: #f0f1f2;
    font-size: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transform: scale(0.95);
}

.active {
    background-color: white;
    color: #00A54F;
    transform: scale(1.05);
}

.name {
    padding: 2px 0;
}

.sport-icon {
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 10px;
}

/* Large devices (desktops, 992px and up */
@media only screen and (min-width: 992px) {
    .sport-list {
        display: none;
    }
}

</style>
