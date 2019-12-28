const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/9519a0785084499a9d57f354b40a925e/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({url: url, json:true},(error,response) => {
        if(error){
            callback('Forecast service not reachable.', undefined);
        }else if(response.body.error){
            callback('No Forecast found, try another search!', undefined);
        }else{
            callback(undefined,{
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability
            });
        }
    });
};
 
module.exports = forecast;