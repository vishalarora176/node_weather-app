const request = require('request');

const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2lzaC1kZXYiLCJhIjoiY2p2ZGUxMG5qMGUzNDQ0cGN1enRiMTBrayJ9.OtpVF6SUFWqqqztnEi2Zsg';

const generateLocationURL = (location) => {
  return 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ location +'.json?access_token='+ MAPBOX_TOKEN +'&&limit=1'
}

const geoCode = (location, callback) => {
  request({url: generateLocationURL(location), json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to fetch the information right now!!')
    } else if (body.features.length === 0) {
      callback('Unable to find the location!!');
    } else {
      const features = body.features[0];
      callback(undefined, {
        longitude: features.center[0], 
        latitude: features.center[1],
        location: features.place_name
      });
    }
  });
}

module.exports = geoCode