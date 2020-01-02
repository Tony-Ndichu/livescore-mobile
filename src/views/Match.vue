<template>
  <div>
    <Banner />
    <CompetingTeams :team-details="teamDetails" />
    <Tabs />
  </div>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import CompetingTeams from '../components/CompetingTeams.vue';
import Tabs from '../components/Tabs.vue';

export default {
  name: 'Match',
  components: {
    Banner,
    CompetingTeams,
    Tabs,
  },
  data: () => ({
    teamDetails: {
      teamOneName: '',
      teamTwoName: '',
      teamOneScore: '',
      teamTwoScore: '',
    },
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
  },
};

</script>
