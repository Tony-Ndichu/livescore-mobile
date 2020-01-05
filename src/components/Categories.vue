<template>
  <div class="categories-container">
    <div class="sport-name">
      {{ sportName }}
    </div>
    <div
      v-if="Object.entries(categoriesForSingleSport).length !== 0"
      class="category-banner"
    >
      CATEGORIES
    </div>

    <div
      v-if="Object.entries(categoriesForSingleSport).length !== 0"
      class="category-list"
    >
      <div
        v-for="(category, index) in categoriesForSingleSport"
        :key="index"
        :class="selectedCategoryId == index ? 'single-category active' : 'single-category'"
        @click="sortByCategory(index)"
      >
        <div class="country-flag">
          <div
            v-if="category[0] === 'All'"
            class="all-icon"
          >
            <font-awesome-icon :icon="['fas', 'globe-africa']" />
          </div>
          <div
            v-else-if="category[0].includes('International') || category[0].includes('ITF')"
            class="international-flag"
          >
            <img
              :src="flag"
              alt="world-flag"
            >
          </div>
          <country-flag
            v-else
            :country="findAlphaCode(category[0])"
            size="small"
          />
        </div>
        {{ category[0] }}
      </div>
    </div>
    <div
      v-else
      class="no-categories"
    >
      Sorry, no categories are currently available for {{ sportName }}
    </div>
  </div>
</template>

<script>
import { getCode } from 'country-list';
import CountryFlag from 'vue-country-flag';
import { manuallyGetIsoCode, filterByCategoryId } from '../utils';
import InternationalFlag from '../assets/images/world.png';
import All from '../assets/images/globe.png';

export default {
  name: 'Categories',
  components: {
    CountryFlag,
    All,
  },
  props: ['categoriesForSingleSport', 'sportName'],
  data: () => ({
    flag: InternationalFlag,
    All,
  }),
  computed: {
    gamesForSingleSport() {
      return this.$store.getters.getGamesForSingleSport;
    },
    selectedCategoryId() {
      return this.$store.getters.getCategoryId;
    },
  },
  mounted() {
    // this.$store.dispatch('setCategoryId', 0);
    console.log('this.$route=====>', this.$route.name);
  },
  methods: {
    findAlphaCode(countryName) {
      if (getCode(countryName) == undefined) {
        return manuallyGetIsoCode(countryName);
      }
      return getCode(countryName);
    },
    sortByCategory(categoryBetradarId) {
      // if the categoryId is 0 (default for "all"), simply fetch all games for the sport rather than filter by category

      if (this.$route.name !== 'home' || this.$route.name !== 'live') {
        this.$router.push('/');
      }
      if (categoryBetradarId == 0) {
        this.$store.dispatch('setFilteringByCategoryId', false);
        this.$store.dispatch('setCategoryId', 0);
        this.$store.dispatch('getGamesForSingleSport');
      } else {
        this.$store.dispatch('setSortingByCategory', { categoryId: categoryBetradarId, isTrue: true });
      }

      setTimeout(() => { this.$store.dispatch('toggleSideMenu'); }, 150);
    },
  },
};
</script>

<style scoped>
.international-flag {
    width: 15px;
}

.international-flag img {
    width: 100%;
}
.category-banner {
    width: 100%;
    /* position: fixed; */
    display: block;
    padding: 60px 10px 10px 40px;
    font-weight: bold;
    margin-bottom: 20px;
    color: white;
    background-color:#2D2F92;
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
    z-index: 4;
}
.categories-container {
    display: flex;
    flex-direction: column;
}

.no-categories {
     padding: 70px 10px 0px 10px;
     font-size: 14px;
     text-align: center;
}

.sport-name {
    z-index: 5;
    position: fixed;
    width: 100%;
    background-color: #018d3c;
    color: white;
    padding: 10px 0px 10px 10px;
}

.single-category {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding: 5px;
    margin: 2px 2px 10px 2px;
    align-items: center;
}

.active {
    background-color: white;
    transform: scale(1.20);
    box-shadow: 0 -3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
    border-radius: 2px;
    margin: 6px 6px 14px 6px;
    padding: 5px 5px 5px 15px;
    border-left: 3px solid blue;
}

.country-flag {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.category-list {
    padding-left: 50px;
    /* padding-top: 120px; */
}
</style>
