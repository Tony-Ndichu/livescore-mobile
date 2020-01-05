<template>
  <div class="single-game-card">
    <div
      v-for="(game, index) in gamesInTournament"
      :key="index"
      class="game-details"
    >
      <div
        :class="game.status === 'finished' ? 'game-status' : game.status === 'live' ? 'game-live' : null"
        @click="openSingleGame(game.match_id)"
      >
        {{ game.status === 'finished' ? 'FT' : game.status === 'live' ? 'LIVE' : null }}
      </div>
      <!-- <div class="game-live" v-else>LIVE</div> -->

      <div
        class="team-details"
        @click="openSingleGame(game.match_id)"
      >
        <div class="team-card">
          <div class="team-score">
            {{ "team_1_score" in game ? game.team_1_score : '?' }}
          </div>
          <div :class="game.team_1_score > game.team_2_score ? 'team-name bold' : 'team-name'">
            {{ game.team_1_name }}
          </div>
        </div>
        <div class="team-card">
          <div class="team-score">
            {{ "team_2_score" in game ? game.team_2_score : '?' }}
          </div>
          <div :class="game.team_1_score < game.team_2_score ? 'team-name bold' : 'team-name'">
            {{ game.team_2_name }}
          </div>
        </div>
      </div>

      <div
        class="favorite"
        @click="favoriteGame(game.match_id)"
      >
        <i class="far fa-star" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleGameCard',
  props: ['gamesInTournament'],
  mounted() {

  },
  methods: {
    openSingleGame(match_id) {
      this.$router.push(`/match/${match_id}`);
    },
    favoriteGame(match_id) {
      console.log('favorite====>', match_id);
    },
  },
};
</script>

<style scoped>
.single-game-card {
    display: block;
    float: left;
    clear: both;
    width: 100%;
    margin-bottom: 10px;
}

.bold {
    font-weight: 600;
    font-size: 14px;
}

.single-game-wrapper {
    display: block;
    margin-bottom: 10px;
}

.progress-wrapper {
    display: block;
    width: 20%;
    background-color: white;
    float: left;
    clear: none;
}

.game-details{
    display: flex;
    width: 100%;
    background-color: white;
    margin-bottom: 5px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.2);
}

.team-score {
    display: flex;
    width: 20%;
    background-color: #2D2F92;
    color: #FFF102;
    justify-content: center;
    align-items: center;
    font-size: 13px;
}

.team-name {
    display: flex;
    background-color: white;
    font-size: 13px;
    padding: 5px;
    color: #00A54F;
    /* font-weight: 100; */
    width: 80%;
}

.team-card {
    display: flex;
    float: left;
    width: 100%;
}

.game-status {
    display: flex;
    width: 20%;
    justify-content: center;
    align-items: center;
    color: #00A54F;
}

.favorite {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00A54F;
}
.game-live {
    display: flex;
    width: 20%;
    justify-content: center;
    align-items: center;
    color: #EE1C23;
    font-weight: 700;
}

.team-details {
    display: block;
    float: left;
    width: 70%;

}
</style>
