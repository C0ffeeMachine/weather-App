const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000 ;

// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public');
const viewPaths = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPaths);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));


app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'YASH SHUKLA'
    });
});
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Page',
        name: 'YASH SHUKLA'
    });
});
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'YASH SHUKLA'
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        });
    }

    geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(data.latitude,data.longitude,(error,forecastData) =>{
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                temperature: forecastData.temperature,
                precipProbability: forecastData.precipProbability,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'YASH SHUKLA',
        errorMessage: 'Help article not found'     
    });
});
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'YASH SHUKLA',
        errorMessage: 'Page not found'
    });
});

app.listen(port,() => {
    console.log('Server is up on port' + port);
});