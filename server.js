'use strict';

//bring in express, dotenv, and cors dependencies
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

//APP SETUP
//brings in the things form the .env file
const PORT = process.env.PORT;
const GEOCODE = process.env.GEOCODE;
const WEATHER = process.env.WEATHERBIT;
const TRAILS = process.env.TRAILS;

//gets instance of express for the app
const app = express();
const client = new pg.Client(process.env.DATABASE);

//brings in cors
app.use( cors() );

app.get('/', homeHandler);
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/trails', trailsHandler);
app.use('*', noFindHandler);
app.use(errorHandler);


//connect to the DB then start the server
client.connect()
  .then( () => {
    console.log('Connected to the Database');
  })
  .catch(error => console.error('databas error:', error)
  );

app.listen( PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function homeHandler(request, response){
  response.status(200).send(console.log('Success!'));
}

//get location
function locationHandler(request, response){
  const SQL = 'SELECT * from cities WHERE search_query = $1';
  const city = [request.query.city];

  client.query(SQL, city)
    .then(locations => {
      if (locations.rowCount){
        console.log('The DB has it!');
        response.status(200).send(locations.rows[0]);
      }
      else{
        let API = 'https://us1.locationiq.com/v1/search.php';

        const queryParameters = {
          key:GEOCODE,
          q: city,
          format: 'json',
        };


        superagent.get(API)
          .query(queryParameters)
          .then(data => {

            //run data through constructor function to match contract
            let realData = new Location(data.body[0],city);

            saveLocation(city, data.body);

            //Return an object which contains the necessary information for correct client rendering. See the sample response.
            response.status(200).json(realData);
          })
          .catch( () =>{
            response.status(500).send('Sorry, the location you requested could not be loaded');
          });
      }
    });
}

function saveLocation(city, data) {

  const location  = new Location(data[0]);
  const values = [city, location.formatted_query, location.latitude, location.longitude];
  const SQL = `
  INSERT INTO cities (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *`;

  return client.query(SQL, values)
    .then(results => {
      console.log(results);
      return results.rows[0];
    });
}
function Location (obj, query){
  this.search_query = query;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

//Create a route with a method of `get` and a path of `/weather`. The callback should use the provided JSON data.
function weatherHandler (request, response){

  let API = 'https://api.weatherbit.io/v2.0/forecast/daily';

  const coordinates = {
    lat: request.query.latitude,
    lon: request.query.longitude
  };

  const queryParameters = {
    key:WEATHER,
    lat: coordinates.lat,
    lon: coordinates.lon
  };

  superagent.get(API)
    .query(queryParameters)
    .then(weather =>{
      //itirate through the weather data to display all weather times
      let realWeather = weather.body.data.map(object => {

        //run data through constructor function to match contract
        return new Weather(object.weather.description,object.valid_date);

      });
      //Return an object which contains the necessary information for correct client rendering. See the sample response.
      response.status(200).json(realWeather);
    })
    .catch( () => {
      response.status(500).send('Sorry, the weather is having issues loading');
    });
}

function Weather (forecast, time){
  this.forecast = forecast;
  this.time = new Date(time).toDateString();
}

function trailsHandler (request, response) {

  const coordinates = {
    lat: request.query.latitude,
    lon: request.query.longitude
  };

  let API = 'https://www.hikingproject.com/data/get-trails';

  const queryParameters = {
    key: TRAILS,
    lat: coordinates.lat,
    lon: coordinates.lon
  };

  superagent.get(API)
    .query(queryParameters)
    .then(trail =>{
      // console.log(trail.body.trails[0].conditionDate);
      //itirate through the weather data to display all weather times
      let trails = trail.body.trails.map(object => {

        //run data through constructor function to match contract
        return new Trails(object.name,object.location,object.length, object.stars, object.starVotes, object.summary, object.url, object.condition_status, object.conditionDate);

      });
      //Return an object which contains the necessary information for correct client rendering.
      response.status(200).json(trails);
    })
    .catch(() => {
      response.status(500).send('Sorry, the trails you requested are having trouble loading');
    });
}

function Trails (name, location, length, stars, star_votes, summary, trail_url, conditions, conditionDate){
  this.name = name;
  this.location = location;
  this.length = length;
  this.stars = stars;
  this.star_votes = star_votes;
  this.summary = summary;
  this.trail_url = trail_url;
  this.conditions = conditions;
  this.condition_date = new Date(conditionDate.slice(0,10)).toDateString();
  this.condition_time = conditionDate.slice(11,19);
}

function noFindHandler(request, response){
  response.status(404).send('Sorry, cannot find what you are looking for');
}

function errorHandler (error, request, response){
  response.status(500).send('Sorry, something went REALLY wrong');
}