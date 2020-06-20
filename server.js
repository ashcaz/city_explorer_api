'use strict';

//bring in express, dotenv, and cors dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//APP SETUP
//brings in the things form the .env file
const PORT = process.env.PORT;

//gets instance of express for the app
const app = express();

//brings in cors
app.use( cors() );


//Create a route with a method of `get` and a path of `/location`. The route callback should invoke a function to convert the search query to a latitude and longitude. The function should use the provided JSON data.
app.get('/location', (request, response) => {
  let data = require('./data/location.json');
  let city = request.query.city;
  console.log(city);

  //run data through constructor function to match contract

  let realData = new Location(data[0],city);
  console.log(realData);

  //Return an object which contains the necessary information for correct client rendering. See the sample response.
  response.status(200).json(realData);

});

//Create a constructor function will ensure that each object is created according to the same format when your server receives the external data. Ensure your code base uses a constructor function for this resource.
function Location (obj, query){
  this.search_query = query;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Weather (obj){
  this.search_query = city;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}
app.use('*', (request, response) => {
  response.status(404).send('Sorry, something went wrong');
});

app.use((error, request, response, next) => {
  response.status(500).send('Sorry, something went wrong');
});

app.listen( PORT, () => console.log('Server is running on port', PORT));
