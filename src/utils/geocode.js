const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=address&access_token=pk.eyJ1IjoiYzBmZmVlbWFjaGluZSIsImEiOiJjazRtcHlmdnAwd2x1M29uNXZlaG9vZ2JtIn0.-nfhLJS1_HhJR_1Iy0cCnQ&limit=1'
    request({url: url, json: true},(error,response) => {
        if(error){
            callback('Location services not reachable', undefined);
        }else if(response.body.features.length === 0){
            callback('Location not found. Try another search!',undefined);
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};
  
module.exports = geocode;