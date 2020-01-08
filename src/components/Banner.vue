<template>
  <div
    id="top-header"
    class="header"
  >
    <a
      class="navbar"
      href="#"
    >
      <img
        src="https://www.betika.com/static/logo.1e28851.png"
        height="50"
        class="brand-logo"
        alt="brand logo"
      >
    </a>

    <!-- <div class="terms-and-conditions">
      <img
        :src="ageLimitImage"
        class="age-logo"
        alt="age-limit"
      >
      <div class="description">
        <span>Terms and Conditions Apply.</span>
        <span>Play Responsibly</span>
      </div>
    </div> -->
    <div class="dropdown-sports">
      <Menu />
    </div>

    <div
      class="menu-icon"
      @click="findGameCategories"
    >
      <font-awesome-icon :icon="['fas', 'bars']" />
    </div>
  </div>
</template>

<script>
import over18Logo from '../assets/images/agelimit.svg';
import Menu from './Menu.vue';

export default {
  name: 'Banner',
  components: {
    Menu,
  },
  data: () => ({
    ageLimitImage: over18Logo,
  }),
  computed: {

  },
  mounted() {
    // document.getElementById('top-header').scrollIntoView();
  },
  methods: {
    findGameCategories() {
      this.$store.dispatch('getCategoriesForSingleSport');
      this.$store.dispatch('setTournamentNamesForSingleSport');
      this.toggleSideMenu();
    },
    toggleSideMenu() {
      this.$store.dispatch('toggleSideMenu');
    },
  },
};
</script>

<style scoped>
.menu-icon {
    margin-right: 10px;
}

.description {
    font-size: 6px;
    width: 75px;
    display: flex;
    flex-wrap: wrap;
}

.terms-and-conditions {
    width: 100px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
}

.header {
    background-color: #FFF102;
    padding: 5px;
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
}

.header a {
    text-decoration: none;
}

.brand-logo {
    height: 30px;
}

.age-logo {
    height: 20px;;
}
</style>
