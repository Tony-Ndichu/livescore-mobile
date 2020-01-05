<template>
  <div>
    <div
      v-if="sideMenuState"
      class="sidebar-backdrop"
      @click="toggleSideMenu"
    />
    <transition name="slide">
      <div
        v-if="sideMenuState"
        class="sidemenu"
      >
        <div
          class="close-icon-container"
          @click="toggleSideMenu()"
        >
          <font-awesome-icon
            class="close-icon"
            :icon="['fas', 'times']"
          />
        </div>
        <Categories
          :categories-for-single-sport="categoriesForSingleSport"
          :sport-name="currentSportName"
        />
        <LeaguesAndTournaments :tournamentNames="tournamentNames" />
      </div>
    </transition>
  </div>
</template>

<script>
import Categories from './Categories.vue';
import LeaguesAndTournaments from './LeaguesAndTournaments.vue';

export default {
  name: 'SideMenu',
  components: {
    Categories,
    LeaguesAndTournaments,
  },
  computed: {
    sideMenuState() {
      return this.$store.getters.getSideMenuState;
    },
    categoriesForSingleSport() {
      return this.$store.getters.getCategoriesForSingleSport;
    },
    currentSportName() {
      return this.$store.getters.getCurrentSportName;
    },
    alreadyFetchedCategories() {
      return this.$store.getters.getAlreadyFetchedCategories;
    },
    tournamentNames() {
      return this.$store.getters.getTournamentNamesForSingleSport;
    },
  },
  mounted() {
  },
  methods: {
    toggleSideMenu() {
      this.$store.dispatch('toggleSideMenu');
    },
  },
};
</script>

<style scoped>

.slide-enter-active,
.slide-leave-active
{
    transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
    transition: all 150ms ease-in 0s
}

.sidebar-backdrop {
        background-color: rgba(0,0,0,.5);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 3;
    }

.sidemenu {
    position: fixed;
    width: 70%;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: white;
    box-shadow: 0 -3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
    overflow: auto;
    z-index: 5;
}

.close-icon-container {
    display: block;
    position: fixed;
    width: 70%;
    text-align: right;
    font-size: 20px;
    right: 0;
    padding-bottom: 10px;
    z-index: 10;
}

.close-icon {
    margin: 5px;
}
</style>
