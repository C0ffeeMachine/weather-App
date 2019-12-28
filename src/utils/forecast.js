const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/9519a0785084499a9d57f354b40a925e/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({url: url, json:true},(error,response) => {
        if(error){
            callback('Forecast service not reachable.', undefined);
        }else if(response.body.error){
            callback('No Forecast found, try another search!', undefined);
        }else{
            callback(undefined,response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+'% chances of rain. Maximum temperature of the day was '+response.body.daily.data[0].temperatureHigh+' degrees and minimum temperature of the day was '+response.body.daily.data[0].temperatureLow+' degrees.');
        }
    });
};

module.exports = forecast;