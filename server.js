'use strict';

//bring in express, dotenv, and cors dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//APP SETUP
//brings in the things form the .env file
const PORT = process.env.PORT || 3000;
const GEOCODE = process.env.GEOCODE;
const WEATHERBIT = process.env.WEATHERBIT;

//gets instance of express for the app
const app = express();

//brings in cors
app.use( cors() );

app.get('/', (request, response) => {
  response.status(200).send(console.log('Success!'));
});

//Create a route with a method of `get` and a path of `/location`. The route callback should invoke a function to convert the search query to a latitude and longitude. The function should use the provided JSON data.
app.get('/location', (request, response) => {

  let city = request.query.city;

  let API = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE}&q=${city}&format=json`;

  superagent.get(API)
    .then(data => {

      //run data through constructor function to match contract
      let realData = new Location(data.body[0],city);

      //Return an object which contains the necessary information for correct client rendering. See the sample response.
      response.status(200).json(realData);
    })
    .catch( () =>{
      response.status(500).send('Sorry, the location you requested could not be loaded');
    });

});

//Create a route with a method of `get` and a path of `/weather`. The callback should use the provided JSON data.
app.get('/weather', (request, response) => {

  const coordinates = {
    lat: request.query.latitude,
    lon: request.query.longitude
  };
  let API = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${WEATHERBIT}`;

  superagent.get(API)
    .then(weather =>{
      console.log(weather.body.data);
      //itirate through the weather data to display all weather times
      let realWeather = weather.body.data.map(object => {

        //run data through constructor function to match contract
        return new Weather(object.weather.description,object.valid_date);

      });
      //Return an object which contains the necessary information for correct client rendering. See the sample response.
      response.status(200).json(realWeather);
      console.log(realWeather);
    })
    .catch(() => {
      response.status(500).send('Sorry, the weather is having issues loading');
    });
});

//Create a constructor function will ensure that each object is created according to the same format when your server receives the external data. Ensure your code base uses a constructor function for this resource.
function Location (obj, query){
  this.search_query = query;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Weather (forecast, time){
  this.forecast = forecast;
  this.time = new Date(time).toDateString();
}


app.listen( PORT, () => console.log('Server is running on port', PORT));


app.use('*', (request, response) => {
  response.status(404).send('Sorry, something went wrong');
});

app.use((error, request, response, next) => {
  response.status(500).send('Sorry, something went wrong');
});


