const request = require('request');

const DARKSKY_URL = 'https://api.darksky.net/forecast/412c1f9a199af5c040f67d67cbbe0b14/';

const constructWeatherURL = (long, lat) => {
  return DARKSKY_URL + lat + ',' + long + '?units=si';
}

const forecast = (long, lat, callback) => {
  const GET_WEATHER_URL = constructWeatherURL(long, lat);
    request({url: GET_WEATHER_URL, json: true}, (error, response) => {
      if (error) {
        callback('Unable to fetch the information right now !!')
      } else if (response.body.error) {
        callback('Unable to find location')
      } else {
        const currentWeather = response.body.currently;
        callback(undefined, `${response.body.daily.data[0].summary} It is currently ${currentWeather.temperature} out. There is a ${currentWeather.precipProbability}% chance of rain.`);
      }
    });
}

module.exports = forecast