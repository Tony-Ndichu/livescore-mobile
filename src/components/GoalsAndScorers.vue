<template>
  <div class="wrapper">
    <div class="font-weight-black">
      Goals
    </div>
    <div
      v-for="goal in goalsAndScorers"
      :key="goal.goal_id"
      class="goals"
    >
      <div
        v-if="goal.scoring_team === '1'"
        class="team-one-goals"
      >
        <div class="team-one-goals-wrapper">
          <div class="team-one-goal-time">
            {{ goal.goal_time }}'
          </div>

          <div class="player-name">
            {{ goal.player }} <font-awesome-icon :icon="['fas', 'futbol']" />
          </div>
        </div>
      </div>

      <div
        v-if="goal.scoring_team === '2'"
        class="team-two-goals"
      >
        <div class="team-two-goals-wrapper">
          <div class="player-name">
            <font-awesome-icon :icon="['fas', 'futbol']" /> {{ goal.player }}
          </div>

          <div class="team-two-goal-time">
            {{ goal.goal_time }}'
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalsAndScorers',
  data: () => ({
    goalsAndScorers: [],
  }),
  computed: {
    singleMatchDetails() {
      return this.$store.getters.getSingleMatchDetails;
    },
  },
  watch: {
    singleMatchDetails(newValue) {
      this.goalsAndScorers = newValue.data.goals;
    },
  },
};
</script>

<style scoped>
.wrapper {
    display: block;
    overflow: auto;
}
.team-one-goals {
    display: block;
    float: left;
    clear: both;
    text-align: left;
    font-size: 10px;
}

.team-one-goals-wrapper {
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 
}


.team-two-goals-wrapper {
    display: flex;
    flex-wrap: nowrap;
}

.team-two-goals {
    display: block;
    float: right;
    clear: both;
    text-align: right;
    font-size: 10px;
}

.team-one-goal-time {
    display: block;
    float: left;
    width: 20px;
    margin-right: 10px;
    text-align: left;
}

.team-two-goal-time {
    display: block;
    float: right;
    width: 20px;
    margin-left: 10px;
    text-align: right;
}

.goal-time {
    display: block;
    float: left;
    width: 20px;
    margin-left: 10px;
    text-align: right;
}

</style>
