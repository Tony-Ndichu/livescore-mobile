<template>
  <div class="footer">
    <div
      :class="$route.path === '/' ? 'nav-item active' : 'nav-item'"
      @click="setHome()"
    >
      <div class="nav-item-icon">
        <font-awesome-icon :icon="['fas', 'home']" />
      </div>
      <div class="nav-item-title">
        Home
      </div>
    </div>
    <div
      :class="$route.path === '/live' ? 'nav-item active' : 'nav-item'"
      @click="setLiveGames()"
    >
      <div class="nav-item-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 29 29"
          class="nav--item--icon"
        ><circle
          cx="14.5"
          cy="14.5"
          r="49.9548%"
          fill="#c00"
          class="live"
        ><animate
          attributeName="r"
          begin="0s"
          dur="1.1s"
          repeatCount="indefinite"
          from="40%"
          to="50%"
        /></circle></svg>
      </div>
      <div class="nav-item-title">
        Live
      </div>
    </div>
    <div class="nav-item">
      <div class="nav-item-icon">
        <font-awesome-icon :icon="['fas', 'search']" />
      </div>
      <div class="nav-item-title">
        Search
      </div>
    </div>
    <div
      class="nav-item"
    >
      <div
        class="nav-item-icon"
        @click="viewFavoriteGames()"
      >
        <font-awesome-icon :icon="['fas', 'star']" />
      </div>
      <div class="nav-item-title">
        Favorites
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  computed: {
    alreadyFetchedCategories() {
      return this.$store.getters.getAlreadyFetchedCategories;
    },
  },
  methods: {
    findGameCategories() {
      if (!this.alreadyFetchedCategories) {
        this.$store.dispatch('getCategoriesForSingleSport');
      }
      this.$store.dispatch('setTournamentNamesForSingleSport');
      this.toggleSideMenu();
    },
    setLiveGames() {
      this.$store.dispatch('setLiveGames', true);
      this.$store.dispatch('setLoading', true);
      this.$store.dispatch('getGamesForSingleSport');
      if (this.$route.path !== '/live') {
        this.$router.push('/live');
      }
    },
    setHome() {
      this.$store.dispatch('setFilteringByCategoryId', false);
      this.$store.dispatch('setLiveGames', false);
      this.$store.dispatch('setLoading', true);
      this.$store.dispatch('getGamesForSingleSport');
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    toggleSideMenu() {
      this.$store.dispatch('toggleSideMenu');
    },
    viewFavoriteGames() {
      this.$router.push('/favorites');
    },
  },
};
</script>

<style scoped>
.active {
    color: #00A54F !important;
}

.nav-item {
    padding: 7px;
    color: #7b7b7b;
}

.nav-link {
    text-decoration: none;
    color: #7b7b7b;
}

.nav-item-title {
}

.nav-item-icon {
    font-size: 16px;
}

.footer{
position: fixed;
bottom: 0;
width: 100%;
background-color: #fff;
display: flex;
flex-direction: row;
justify-content: space-around;
text-align: center;
font-size: .81em;
text-transform: capitalize;
box-shadow: 0 -3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
transition: bottom .4s ease-in-out;
}

/* Large devices (desktops, 992px and up */
@media only screen and (min-width: 992px) {
    .footer {
        display: none;
    }
}
</style>
