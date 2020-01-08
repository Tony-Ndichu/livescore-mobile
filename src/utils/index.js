import _ from 'lodash';

export const apiUrl = 'http://35.210.229.131:9004/api';

export const addLeadingZero = (number) => {
  if (number < 10) {
    const stringOne = '0';
    const stringTwo = number.toString();

    return stringOne.concat(stringTwo);
  }
  return number.toString();
};

export const addIcon = (sportTitle) => {
  let iconUrl;
  switch (sportTitle) {
    case 'Soccer':
      iconUrl = 'mdi-soccer';
      break;
    case 'Basketball':
      iconUrl = 'mdi-basketball';
      break;
    case 'Baseball':
      iconUrl = 'mdi-baseball';
      break;
    case 'Ice Hockey':
      iconUrl = 'mdi-hockey-sticks';
      break;
    case 'Tennis':
      iconUrl = 'mdi-tennis';
      break;
    case 'Handball':
      iconUrl = 'mdi-handball';
      break;
    case 'Floorball':
      iconUrl = 'mdi-hockey-sticks';
      break;
    case 'Rugby':
      iconUrl = 'mdi-rugby';
      break;
    case 'Bandy':
      iconUrl = 'mdi-hockey-puck';
      break;
    case 'Football':
      iconUrl = 'mdi-football-helmet';
      break;
    case 'Snooker':
      iconUrl = 'mdi-billiards-rack';
      break;
    case 'Table tennis':
      iconUrl = 'mdi-table-tennis';
      break;
    case 'Darts':
      iconUrl = 'mdi-bullseye-arrow';
      break;
    case 'Volleyball':
      iconUrl = 'mdi-volleyball';
      break;
    case 'Futsal':
      iconUrl = 'mdi-soccer';
      break;
    case 'Badminton':
      iconUrl = 'mdi-badminton';
      break;
    case 'Beach Volley':
      iconUrl = 'mdi-volleyball';
      break;
    default:
  }

  return iconUrl;
};

export const addSportIcons = (sports) => {
  for (let i = 0; i < sports.length; i++) {
    const iconUrl = addIcon(sports[i].sport_name);
    sports[i].icon = iconUrl;
  }

  return sports;
};

export const groupByTournament = (games) => {
  const result = games.reduce((r, a) => {
    r[a.tournament_name] = r[a.tournament_name] || [];
    r[a.tournament_name].push(a);
    return r;
  }, Object.create(null));
  return result;
};

export const groupByTournamentName = (games) => {
  const result = games.reduce((r, a) => {
    r[a.tournament_name] = r[a.tournament_name] || [];
    r[a.tournament_name].push(a.tournament_name);
    r['0'] = ['All'];
    return r;
  }, Object.create(null));
  return result;
};

export const groupByTournamentId = (games) => {
  const result = games.reduce((r, a) => {
    r[a.tournament_betradar_id] = r[a.tournament_betradar_id] || [];
    r[a.tournament_betradar_id].push(a.tournament_name);
    r['0'] = ['All'];
    return r;
  }, Object.create(null));
  return result;
};


export const groupByCategory = (games) => {
  const result = games.reduce((r, a) => {
    r[a.category_betradar_id] = r[a.category_betradar_id] || [];
    r[a.category_betradar_id].push(a.category_name);
    r['0'] = ['All'];
    return r;
  }, Object.create(null));
  return result;
};

export const manuallyGetIsoCode = (countryName) => {
  let isoCode = '';

  switch (countryName) {
    case 'USA':
      isoCode = 'us';
      break;
    case 'Bosnia & Herzegovina':
      isoCode = 'ba';
      break;
    case 'Iran':
      isoCode = 'ir';
      break;
    case 'Russia':
      isoCode = 'ru';
      break;
    case 'Scotland':
      isoCode = 'gbr';
      break;
    case 'Vietnam':
      isoCode = 'vn';
      break;
    case 'Wales':
      isoCode = 'gbr';
      break;
    case 'England':
      isoCode = 'gb';
      break;
    case 'Turkey Amateur':
      isoCode = 'tr';
      break;
    case 'Germany Amateur':
      isoCode = 'de';
      break;
    case 'Austria Amateur':
      isoCode = 'at';
      break;
    case 'Czech Republic':
      isoCode = 'cz';
      break;
    case 'Korea Republic':
      isoCode = 'kp';
      break;
    case 'Moldova':
      isoCode = 'md';
      break;
    default:
  }
  return isoCode;
};

export const filterByCategoryId = (categoryId, gameArray) => {
  const newGameArray = gameArray.filter((el) => el.category_betradar_id == categoryId);
  return newGameArray;
};

export const filterByTournamentId = (tournamentId, gameArray) => {
  const newGameArray = gameArray.filter((el) => el.tournament_betradar_id == tournamentId);
  return newGameArray;
};

export const filterByMatchId = (matchId, gameArray) => {
  const newGameArray = gameArray.filter((el) => el.match_id == matchId);
  return newGameArray;
};

export const removeByMatchId = (matchId, oldArray) => {
  const newGameArray = oldArray.filter((el) => el.match_id != matchId);
  return newGameArray;
};

export const addFavorites = (gameArray, favoritesArray) => {
  const presents = _.intersectionWith(gameArray, favoritesArray, _.isEqual);
  presents.map((value, index) => {
    gameArray.find((o, i) => {
      if (o.match_id == value.match_id) {
        gameArray[i].favorited = true;
      }
    });
  });
  return gameArray;
};


export const filterByFavorites = (gameArray) => {
  const newGameArray = gameArray.filter((el) => el.favorited === true);
  console.log('newGameArray=====>', newGameArray);
  return newGameArray;
};
