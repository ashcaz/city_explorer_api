'use strict';

//bring in express, dotenv, and cors libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//brings in the things form the .env file
const PORT = process.env.PORT;

//gets instance of express for the app
const app = express();

//brings in cors
app.use( cors() );


app.get('/', (request, response) => {
  response.send('Ok, you got it');
});

app.use('*', (request, response) => {
  response.status(404).send('Sorry, something went wrong');
});

app.use((error, request, response, next) => {
  response.status(500).send('Sorry, something went wrong');
});

app.listen( PORT, () => console.log('Server is running on port', PORT));
