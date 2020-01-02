import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
  apiUrl, addSportIcons, groupByCategory, filterByCategoryId, groupByTournamentName,
} from '../utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sports: [], // controls the list of sports displayed
    currentSportId: 1, // controls the filtering of the matches
    currentSportName: 'Soccer', // controls the name of the sport displayed on the sidemenu
    gamesForSingleSport: [], // controls the matches shown per sport
    categoriesForSingleSport: [], // controls the categories shown on the side menu per sport
    noGamesAvailable: false, // used to control display of errors when no games are available for a certain sport
    currentDate: new Date().toISOString().substring(0, 10), // used to control the fiktering of games based on the date selected
    live: false, // used to filter the games depending on whether one clicks on 'live' on the bottom navigation
    loading: false, // used to show loader depending on whether the api call is complete
    sideMenu: false, // used to control the visibility of the side menu
    filteringByCategoryId: false, // used to control the action 'getGamesForSingleSport' to ensure it filters by category before updating state of 'gamesForSingleSport'
    categoryId: 0, // used to determine the category id to be used by the function 'filterByCategoryId' in action 'getGamesForSingleSport'
    alreadyFetchedCategories: false, // used to ensure categories are not reloaded when clicking between categories of the same game to retain the original categories on the side menu
    tournamentsForSingleSport: [],
    calendar: false, // used to show or hide the calendar
    tournamentNamesForSingleSport: [],
    singleMatchDetails: [],
  },
  getters: {
    getSports: (state) => state.sports,
    getCurrentSportId: (state) => state.currentSportId,
    getCurrentSportName: (state) => state.currentSportName,
    getGamesForSingleSport: (state) => state.gamesForSingleSport,
    getNoGamesAvailable: (state) => state.noGamesAvailable,
    getCurrentDate: (state) => state.currentDate,
    getLiveState: (state) => state.live,
    getLoadingState: (state) => state.loading,
    getSideMenuState: (state) => state.sideMenu,
    getCategoriesForSingleSport: (state) => state.categoriesForSingleSport,
    getAlreadyFetchedCategories: (state) => state.alreadyFetchedCategories,
    getCategoryId: (state) => state.categoryId,
    getTournamentsForSingleSport: (state) => state.tournamentsForSingleSport,
    getCalendarState: (state) => state.calendar,
    getTournamentNamesForSingleSport: (state) => state.tournamentNamesForSingleSport,
    getSingleMatchDetails: (state) => state.singleMatchDetails,
  },
  mutations: {
    setSports(state, sports) {
      state.sports = addSportIcons(sports);
    },
    setCurrentSport(state, currentSportObject) {
      state.currentSportId = currentSportObject.betradarId;
      state.currentSportName = currentSportObject.name;
    },
    setGamesForSingleSport(state, gamesForSingleSport) {
      state.gamesForSingleSport = gamesForSingleSport;
    },
    setNoGamesAvailable(state, payload) {
      state.noGamesAvailable = payload;
    },
    setCurrentDate(state, currentDate) {
      state.currentDate = currentDate;
    },
    setLiveGames(state, payload) {
      state.live = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    toggleSideMenu(state) {
      state.sideMenu = !state.sideMenu;
    },
    setCategoriesForSingleSport(state, categoriesForSingleSport) {
      state.categoriesForSingleSport = categoriesForSingleSport;
    },
    filteringByCategoryId(state, payload) {
      state.filteringByCategoryId = payload;
    },
    setCategoryId(state, categoryId) {
      state.categoryId = categoryId;
    },
    alreadyFetchedCategories(state, payload) {
      state.alreadyFetchedCategories = payload;
    },
    setTournamentNamesForSingleSport(state, payload) {
      state.tournamentNamesForSingleSport = payload;
    },
    toggleCalendar(state) {
      state.calendar = !state.calendar;
    },
    setSingleMatchDetails(state, payload) {
      state.singleMatchDetails = payload;
    },
  },
  actions: {
    getSports: async ({ commit }) => {
      const url = `${apiUrl}/v1/sports`;
      const sports = await axios.get(url);
      commit('setSports', sports.data);
    },
    getGamesForSingleSport: async ({ commit, state }) => {
      let url;
      if (state.live) {
        url = `${apiUrl}/v2/${state.currentSportId}/live`;
      } else {
        url = `${apiUrl}/v2/${state.currentSportId}/${state.currentDate}?page=1`;
      }
      const games = await axios.get(url);
      console.log('games====>', games.data.data);

      if (games.data.data === undefined || games.data.data.length === 0) {
        commit('setGamesForSingleSport', []);
        commit('setNoGamesAvailable', true);
      } else if (state.filteringByCategoryId) {
        commit('setGamesForSingleSport', filterByCategoryId(state.categoryId, games.data.data));
      } else {
        commit('setGamesForSingleSport', games.data.data);
        commit('setNoGamesAvailable', false);
      }
      commit('setLoading', false);
    },
    getMatchDetails: async ({ commit }, currentMatchId) => {
      const url = `${apiUrl}/v1/match/${currentMatchId}/`;
      const matchDetails = await axios.get(url);
      console.log('matchDetails===>', matchDetails);
      commit('setSingleMatchDetails', matchDetails);
    },
    setCurrentSport: ({ commit, dispatch }, currentSport) => {
      // set state of alreadyFetchedCategories to false to enable fresh category filtering for new sport
      commit('alreadyFetchedCategories', false);
      commit('filteringByCategoryId', false);
      commit('setCategoryId', 0);

      commit('setCurrentSport', currentSport);
      dispatch('getGamesForSingleSport');
    },
    setCurrentDate: ({ commit, dispatch }, currentDate) => {
      commit('filteringByCategoryId', false);
      commit('alreadyFetchedCategories', false);
      commit('setCategoryId', 0);
      commit('setCurrentDate', currentDate);
      dispatch('getGamesForSingleSport');
    },
    setLiveGames: async ({ commit }, payload) => {
      commit('setLiveGames', payload);
    },
    setLoading: ({ commit }, payload) => {
      commit('setLoading', payload);
    },
    toggleSideMenu: ({ commit }) => {
      commit('toggleSideMenu');
    },
    setNoGamesAvailable: ({ commit }) => {
      commit('setNoGamesAvailable', true);
    },
    getCategoriesForSingleSport: ({ commit, state }) => {
      commit('alreadyFetchedCategories', true);
      commit('setCategoriesForSingleSport', groupByCategory(state.gamesForSingleSport));
    },
    setSortingByCategory: ({ commit, dispatch }, { isTrue, categoryId }) => {
      // set 'filteringByCategoryId' to enable the action 'getGamesForSingleSport' to filter by the current categoryId
      commit('filteringByCategoryId', isTrue);
      commit('setCategoryId', categoryId);
      dispatch('getGamesForSingleSport');
    },
    setTournamentNamesForSingleSport: ({ commit, state }) => {
      commit('setTournamentNamesForSingleSport', groupByTournamentName(state.gamesForSingleSport));
    },
    setCategoryId: ({ commit }, payload) => {
      commit('setCategoryId', payload);
    },
    setFilteringByCategoryId: ({ commit }, payload) => {
      commit('setCategoryId', 0);
      commit('filteringByCategoryId', payload);
    },
    toggleCalendar: ({ commit }) => {
      console.log('toggling calendar==========>');
      commit('toggleCalendar');
    },
  },
});
