<template>
  <div class="games-wrapper">
    <div
      v-for="(game, index) in games"
      :key="index"
      class="single-tournament-card"
    >
      <div class="tournament-header">
        <div class="tournament-name">
          {{ game.nameOfTournament }}
        </div>
        <div class="arrow-right-icon">
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </div>
      </div>
      <SingleGameCard :games-in-tournament="game.gamesInTournament" />
    </div>
  </div>
</template>

<script>
import SingleGameCard from './SingleGameCard.vue';

export default {
  name: 'Tournament',
  components: {
    SingleGameCard,
  },
  props: ['games'],
  watch: {
    games(newValue) {
      // this.gamesInTournament = newValue;
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.games-wrapper {
    width: 100%;
    background-color: white;
    padding-bottom: 300px;
}

.single-tournament-card {
    width: 90%;
    display: block;
    float: left;
    left: 5%;
    position: relative;
    border-radius: 4px;
}

.tournament-header {
    display: flex;
    color: white;
    background-color: #00A54F;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.tournament-name {
    font-size: 12px;
}

.arrow-right-icon {
    font-size: 16px;
}

</style>
