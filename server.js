'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { response } = require('express');

const PORT = process.env.PORT;

const app = express();

app.use( cors() );


app.listen( PORT, () => console.log('Server is running on port', PORT));
