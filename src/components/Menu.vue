<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
      class="mymodal"
    >
      <template v-slot:activator="{ on }">
        <div
          class="current-sport-name"
          v-on="on"
        >
          <div class="name">
            {{ currentSportName }}
          </div>
          <div class="icon">
            <font-awesome-icon
              v-if="!dialog"
              :icon="['fas', 'caret-down']"
            />
            <font-awesome-icon
              v-else
              :icon="['fas', 'caret-up']"
            />
          </div>
        </div>
      </template>
      <v-card>
        <v-card-title>Select Sport</v-card-title>
        <v-divider />
        <div class="wrapper">
          <div
            v-for="sport in listOfSports"
            :key="sport.betradar_id"
            :class="currentSportId == sport.betradar_id ? 'single-sport active' : 'single-sport'"
            @click="setCurrentSport(sport.betradar_id, sport.sport_name)"
          >
            <div class="sport-icon">
              <v-icon color="black">
                {{ sport.icon }}
              </v-icon>
            </div>
            <div class="sport-name">
              {{ sport.sport_name }}
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      dialogm1: '',
      dialog: false,
      sports: [],
    };
  },
  computed: {
    listOfSports() {
      return this.$store.getters.getSports;
    },
    currentSportId() {
      return this.$store.getters.getCurrentSportId;
    },
    currentSportName() {
      return this.$store.getters.getCurrentSportName;
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

.wrapper {
    overflow-y: auto;
    height: 400px;
}

.single-sport {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #e2e2e2;
}

.active {
    background-color: white;
    box-shadow: 0 -3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
    border-left: 5px solid blue;
}

.sport-icon {
    width: 20px;
    height: 10px;
    margin-left: 5px;
    margin-right: 10px;
}

.current-sport-name {
    font-weight: 900;
    color: black;
    text-align: center;
    margin-right: 50%;
    display: flex;
    align-items: center;
}

.name {
    margin-right: 5px;
    color: #2D2F92;
    text-transform: uppercase;
}

.icon {
    color: #2D2F92;
    font-size: 20px;
}
</style>

<style>
.v-dialog {
    position: fixed;
    top: 10%;
    margin: 0 auto;
    display: block;
    width: 90%;
    max-width: 90%;
    left: 5%;
}
</style>
