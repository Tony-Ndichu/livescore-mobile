<template>
  <v-app>
    <div>
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'Main',
  created() {
  },
  methods: {
    handler() {
      console.log('reloading=====>');
      this.$store.dispatch('closeSideMenu');
      this.$$store.dispatch('setAlreadyFetchedCategories', false);
      this.$store.dispatch('setAlreadyFetchedTournamentNames', false);
    },
  },
};
</script>

<style lang="scss">
 @import './styles/main.scss';

</style>
