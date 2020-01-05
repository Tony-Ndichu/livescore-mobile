<template>
    <div>Pitch name </div>
</template>

<script>
export default {
    name: 'Pitch',
    data: () => ({
    venue: '',
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
}
</script>