import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist';
import {
  apiUrl, addSportIcons, groupByCategory, filterByCategoryId, filterByTournamentId, groupByTournamentName, groupByTournamentId, addFavorites,
} from '../utils';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    sports: state.sports,
    currentSportId: state.currentSportId,
    currentSportName: state.currentSportName,
    gamesForSingleSport: state.gamesForSingleSport,
    categoriesForSingleSport: state.categoriesForSingleSport,
    noGamesAvailable: state.noGamesAvailable,
    currentDate: state.currentDate,
    live: state.live,
    loading: state.loading,
    filteringByCategoryId: state.filteringByCategoryId,
    filteringByTournamentId: state.filteringByTournamentId,
    categoryId: state.categoryId,
    tournamentId: state.tournamentId,
    calendar: state.calendar,
    tournamentNamesForSingleSport: state.tournamentNamesForSingleSport,
    singleMatchDetails: state.singleMatchDetails,
    favoriteGames: state.favoriteGames,
  }),
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
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
    filteringByTournamentId: false, // used to control the action 'getGamesForSingleSport' to ensure it filters by tournament before updating state of 'gamesForSingleSport'
    categoryId: 0, // used to determine the category id to be used by the function 'filterByCategoryId' in action 'getGamesForSingleSport'
    tournamentId: 0, // used to determine the tournament id to be used by the function 'filterbyTournamentId' in action 'getGamesForSingleSport'
    alreadyFetchedCategories: false, // used to ensure categories are not reloaded when clicking between categories of the same game to retain the original categories on the side menu
    alreadyFetchedTournamentNames: false, // used to ensure tournamentNames are not reloaded when clicking between tournamentNames of the same game to retain the original tournamentNames on the side menu
    calendar: false, // used to show or hide the calendar
    tournamentNamesForSingleSport: [], // controls the tournament Names shown on the side menu per sport
    singleMatchDetails: [],
    favoriteGames: [],
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
    getTournamentId: (state) => state.tournamentId,
    getTournamentsForSingleSport: (state) => state.tournamentsForSingleSport,
    getCalendarState: (state) => state.calendar,
    getTournamentNamesForSingleSport: (state) => state.tournamentNamesForSingleSport,
    getSingleMatchDetails: (state) => state.singleMatchDetails,
    getFilteringByCategoryIdState: (state) => state.filteringByCategoryId,
    getFilteringByTournamentIdState: (state) => state.filteringByTournamentId,
    getFavoriteGames: (state) => state.favoriteGames,
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
    closeSideMenu(state) {
      state.sideMenu = false;
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
    filteringByTournamentId(state, payload) {
      state.filteringByTournamentId = payload;
    },
    setCategoryId(state, categoryId) {
      state.categoryId = categoryId;
    },
    setTournamentId(state, tournamentId) {
      state.tournamentId = tournamentId;
    },
    alreadyFetchedCategories(state, payload) {
      state.alreadyFetchedCategories = payload;
    },
    alreadyFetchedTournamentNames(state, payload) {
      state.alreadyFetchedTournamentNames = payload;
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
    setFavoriteGames(state, payload) {
      state.favoriteGames = payload;
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

      if (games.data.data === undefined || games.data.data.length === 0) {
        commit('setGamesForSingleSport', []);
        commit('setNoGamesAvailable', true);
      } else if (state.filteringByCategoryId) {
        // check if user is filtering by category before using the category id to set games for a single sport
        const filteredByCategoryId = filterByCategoryId(state.categoryId, games.data.data);

        commit('setGamesForSingleSport', addFavorites(filteredByCategoryId, state.favoriteGames));
      } else if (state.filteringByTournamentId) {
        // check if user is filtering by tournament before using the tournament id to set games for a single sport
        const filteredByTournament = filterByTournamentId(state.tournamentId, games.data.data);
        commit('setGamesForSingleSport', addFavorites(filteredByTournament, state.favoriteGames));
      } else {
        commit('setGamesForSingleSport', addFavorites(games.data.data, state.favoriteGames));
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

      // set state of alreadyFetchedTournaments fo false to enable fresh tournament filtering for new sport
      commit('alreadyFetchedTournamentNames', false);
      commit('filteringByTournamentId', false);
      commit('setTournamentId', 0);

      commit('setCurrentSport', currentSport);
      dispatch('getGamesForSingleSport');
    },
    setCurrentDate: ({ commit, dispatch }, currentDate) => {
      commit('setCategoriesForSingleSport', []);

      // set state of alreadyFetchedCategories fo false to enable fresh category filtering for new sport
      commit('filteringByCategoryId', false);
      commit('alreadyFetchedCategories', false);
      commit('setCategoryId', 0);

      // set state of alreadyFetchedTournaments fo false to enable fresh tournament filtering for new sport
      commit('filteringByTournamentId', false);
      commit('alreadyFetchedTournamentNames', false);
      commit('setTournamentId', 0);

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
      if (!state.alreadyFetchedCategories) {
        commit('setCategoriesForSingleSport', groupByCategory(state.gamesForSingleSport));
      }
      commit('alreadyFetchedCategories', true);
    },
    setTournamentNamesForSingleSport: ({ commit, state }) => {
      if (!state.alreadyFetchedTournamentNames) {
        commit('setTournamentNamesForSingleSport', groupByTournamentId(state.gamesForSingleSport));
      }
      commit('alreadyFetchedTournamentNames', true);
    },
    setSortingByCategory: ({ commit, dispatch }, { isTrue, categoryId }) => {
      // reset sorting by tournament id first
      commit('setTournamentId', 0);
      commit('filteringByCategoryId', false);

      // set 'filteringByCategoryId' to enable the action 'getGamesForSingleSport' to filter by the current categoryId
      commit('filteringByTournamentId', false);
      commit('filteringByCategoryId', isTrue);
      commit('setCategoryId', categoryId);
      dispatch('getGamesForSingleSport');
    },
    setSortingByTournament: ({ commit, dispatch }, { isTrue, tournamentId }) => {
      // reset sorting by category id first
      commit('setCategoryId', 0);
      commit('filteringByCategoryId', false);

      // set 'filteringByTournamentId' to enable the action 'getGamesForSingleSport' to filter by the current tournamentId
      commit('filteringByTournamentId', isTrue);
      commit('setTournamentId', tournamentId);
      dispatch('getGamesForSingleSport');
    },
    setCategoryId: ({ commit }, payload) => {
      commit('setCategoryId', payload);
    },
    setTournamentId: ({ commit }, payload) => {
      commit('setTournamentId', payload);
    },
    setFilteringByCategoryId: ({ commit }, payload) => {
      commit('setCategoryId', 0);
      commit('filteringByCategoryId', payload);
    },
    setFilteringByTournamentId: ({ commit }, payload) => {
      commit('setTournamentId', 0);
      commit('filteringByTournamentId', payload);
    },
    toggleCalendar: ({ commit }) => {
      commit('toggleCalendar');
    },
    setFavoriteGames: ({ commit }, payload) => {
      commit('setFavoriteGames', payload);
    },
    closeSideMenu: ({ commit }) => {
      commit('closeSideMenu');
    },
    setAlreadyFetchedCategories: ({ commit }, payload) => {
      commit('alreadyFetchedCategories', payload);
    },
    setAlreadyFetchedTournamentNames: ({ commit }, payload) => {
      commit('alreadyFetchedTournamentNames', payload);
    },
    // addFavoriteKey: ({ commit, state }, payload) => {
    //   const newArray = addFavoriteKey(payload, state.gamesForSingleSport);
    //   commit('addFavoriteKey', newArray);
    // },
  }
});
