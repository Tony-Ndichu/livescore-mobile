<template>
  <div
    v-if="liveState"
    class="errors"
  >
    <v-alert
      text
      color="error"
    >
      Sorry, no live matches are currently available for {{ sportName }}
    </v-alert>
  </div>
  </div>
  <div
    v-else
    class="errors"
  >
    <v-alert
      text
      color="error"
    >
      Sorry, no matches are currently available for {{ sportName }}
    </v-alert>
  </div>
  </div>
</template>


<script>
export default {
  name: 'NoGames',
  computed: {
    liveState() {
      return this.$store.getters.getLiveState;
    },
    sportName() {
      return this.$store.getters.getCurrentSportName;
    },
  },
};
</script>

<style scoped>
.errors {
    display: block;
    margin: 0 auto;
    width: 80%;
    margin-top: 5%;
    text-align: center;
}
</style>
