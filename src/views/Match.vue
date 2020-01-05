<template>
  <div>
    <Banner />
    <SideMenu />
    <div class="match-view-top-wrapper">
      <v-app-bar
        color="#2D2F92"
        dark
        shrink-on-scroll
        :src="image"
        scroll-target="#scrolling-techniques-2"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          />
        </template>
        <div
          class="competing-teams"
        >
          <div class="team-name-match-view">
            {{ teamDetails.teamOneName }}
          </div>

          <div class="scores">
            <span>{{ teamDetails.teamOneScore }}</span> - <span>{{ teamDetails.teamTwoScore }}</span>
          </div>
          <div class="team-name-match-view">
            {{ teamDetails.teamTwoName }}
          </div>
        </div>


        <template v-slot:extension>
          <v-tabs
            v-model="currentItem"
            align-with-title
            :show-arrows="true"
            background-color="#2D2F92"
            prev-icon="$prev"
            next-icon="$next"
          >
            <v-tab
              v-for="item in items"
              :key="item"
              :href="'#tab-' + item"
              class="tab-text"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
    </div>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-tabs-items v-model="currentItem">
        <v-tab-item
          id="tab-MATCH INFO"
        >
          <v-card flat>
            <v-card-text>
              <GoalsAndScorers />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>


      <v-tabs-items v-model="currentItem">
        <v-tab-item
          id="tab-STATISTICS"
        >
          <v-card flat>
            <v-card-text>
              <GoalsAndScorers />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

      <div style="height: 200vh;" />
    </v-sheet>
  </div>


  </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import GoalsAndScorers from '../components/GoalsAndScorers.vue';
import stadium from '../assets/images/stadium.jpeg';
import SideMenu from '../components/SideMenu.vue';

export default {
  name: 'Match',
  components: {
    Banner,
    GoalsAndScorers,
    SideMenu,
  },
  data: () => ({
    items: [
      'MATCH INFO', 'STATISTICS', 'LINE-UP', 'TRACKER', 'OTHER', 'FINAL',
    ],
    currentItem: 'tab-MATCH INFO',
    teamDetails: {
      teamOneName: '',
      teamTwoName: '',
      teamOneScore: '',
      teamTwoScore: '',
    },
    text: 'Lorem ipsum dolor sit amet, consectetur',
    image: stadium,
  }),
  computed: {
    singleMatchDetails() {
      return this.$store.getters.getSingleMatchDetails;
    },
  },
  watch: {
    singleMatchDetails(newValue) {
      this.teamDetails.teamOneName = newValue.data.match.details.team_1_name;
      this.teamDetails.teamTwoName = newValue.data.match.details.team_2_name;
      this.teamDetails.teamOneScore = newValue.data.full_t1;
      this.teamDetails.teamTwoScore = newValue.data.full_t2;
    },
  },
  mounted() {
    this.$store.dispatch('getMatchDetails', this.$route.params.id);
    this.scrollToTop();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};

</script>

<style>
.tab-text {
    padding: 0px !important;
    font-size: 10px !important;
}

.competing-teams {
    display: flex;
    justify-content: space-around;
    width: 100%;
    color: white;
    align-items: center;
}

.team-name-match-view {
    width: 35%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  text-align: center;
}

.scores {
  width: 30%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

.match-view-top-wrapper {
  margin-bottom: 10px;
}

</style>
