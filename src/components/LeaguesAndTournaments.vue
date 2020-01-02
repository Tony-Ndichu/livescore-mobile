<template>
  <div>
    <div class="tournament-banner">
      TOURNAMENTS
    </div>
    <div
      v-if="Object.entries(tournamentNames).length !== 0"
      class="tournament-list"
    >
      <div
        v-for="(tournament, index) in tournamentNames"
        :key="index"
        class="tournament-name"
      >
        {{ tournament[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaguesAndTournaments',
  props: ['tournamentNames'],
  mounted() {
  },
};
</script>

<style scoped>
.tournament-banner {
    width: 100%;
    padding: 10px 0 10px 40px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    color: white;
    background-color:#2D2F92;
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
}

.tournament-list {
    padding-left: 50px;
    padding-top: 10px;
}

.tournament-name {
    padding: 5px;
    margin: 2px 2px 10px 2px;
}
</style>
