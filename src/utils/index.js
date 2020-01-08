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
      iconUrl = 'https://www.betika.com/lite/img/sport/soccer.png';
      break;
    case 'Basketball':
      iconUrl = 'https://www.betika.com/lite//img/sport/basketball.png';
      break;
    case 'Baseball':
      iconUrl = 'https://www.betika.com/lite//img/sport/baseball.png';
      break;
    case 'Ice Hockey':
      iconUrl = 'https://www.betika.com/lite/img/sport/icehockey.png';
      break;
    case 'Tennis':
      iconUrl = 'https://www.betika.com/lite//img/sport/tennis.png';
      break;
    case 'Handball':
      iconUrl = 'https://www.betika.com/lite/img/sport/handball.png';
      break;
    case 'Floorball':
      iconUrl = 'https://www.betika.com/lite//img/sport/tennis.png';
      break;
    case 'Rugby':
      iconUrl = 'https://www.betika.com/lite//img/sport/rugby.png';
      break;
    case 'Bandy':
      iconUrl = 'https://www.betika.com/lite//img/sport/baseball.png';
      break;
    case 'Football':
      iconUrl = 'https://www.betika.com/lite//img/sport/rugby.png';
      break;
    case 'Snooker':
      iconUrl = 'https://www.betika.com/lite//img/sport/snooker.png';
      break;
    case 'Table tennis':
      iconUrl = 'https://www.betika.com/lite//img/sport/tennis.png';
      break;
    case 'Darts':
      iconUrl = 'https://www.betika.com/lite//img/sport/darts.png';
      break;
    case 'Volleyball':
      iconUrl = 'https://www.betika.com/lite/img/sport/volleyball.png';
      break;
    case 'Futsal':
      iconUrl = 'https://www.betika.com/lite/img/sport/soccer.png';
      break;
    case 'Badminton':
      iconUrl = 'https://www.betika.com/lite/img/sport/snooker.png';
      break;
    case 'Beach Volley':
      iconUrl = 'https://www.betika.com/lite/img/sport/volleyball.png';
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


export const filterByFavorites = gameArray => {
  const newGameArray = gameArray.filter((el) => el.favorited === true);
  console.log('newGameArray=====>', newGameArray);
  return newGameArray;
};

