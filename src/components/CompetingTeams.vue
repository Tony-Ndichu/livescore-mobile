<template>
  <div class="wrapper">
    <div
      class="stadium"
      :style="{ backgroundImage: `url('${image}')` }"
    />
    <div class="hue" />
    <div
      class="competing-teams"
    >
      <div class="team-name">
        {{ teamDetails.teamOneName }}
      </div>

      <div class="scores">
        {{ teamDetails.teamOneScore }} - {{ teamDetails.teamTwoScore }}
      </div>
      <div class="team-name">
        {{ teamDetails.teamTwoName }}
      </div>
    </div>
  </div>
</template>

<script>
import stadium from '../assets/images/stadium.jpeg';

export default {
  name: 'CompetingTeams',
  props: ['teamDetails'],
  data: () => ({
    image: stadium,
  }),
};
</script>

<style scoped>

.wrapper {
    position: relative;
    width: 100%;
    overflow: auto;
    height: 150px;
}

.stadium {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
    height: 100%;
}
.hue {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;

}
.competing-teams {
    display: flex;
    position: absolute;
    top: 20%;
    left: 0;
    justify-content: space-around;
    width: 100%;
    color: white;
    z-index: 3;
    font-weight: bold;
}

.team-name {
    width: 20%;
    text-align: center;
}

.scores {

}
</style>
