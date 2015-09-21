process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Requiring dependencies
var mongoose = require('mongoose');

// Configure Mongoose
var db = mongoose.connect(process.env.MONGOLAB_URI || "mongodb://heroku_pmrpz85t:pkmdupmnltkm4a21j098037aur@ds051553.mongolab.com:51553/heroku_pmrpz85t");

// Configure Express
var express = require('./config/express');
var app = express();

// Bootstrap passport config
var passport = require('./config/passport')();

// Bootstrap application
app.listen(3000);

// Tell developer about it
console.log('Server running at http://localhost:3000/');