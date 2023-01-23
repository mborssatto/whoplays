console.log("This is the start🏁")
require('dotenv');
require('dotenv').config({ debug: process.env.DEBUG });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var request = require('request')
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');

require('./database-connection');


// Spotify API - getting Access Token to access Web API (doesn't require user login)
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var spotifyAccessToken

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    app.set('spotifyAccessToken', body.access_token);
    console.log("***We have an Access Token 🥳" + body.access_token)
  }
});

// async function getSpotifyAccessToken() {
//   try {
//     const response = await new Promise((resolve, reject) => {
//       request.post(authOptions, function(error, response, body) {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(response);
//         }
//       });
//     });
//     if (response.statusCode === 200) {
//       const spotifyAccessToken = response.body.access_token;
//       console.log("***We have an Access Token 🥳" + spotifyAccessToken);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// getSpotifyAccessToken()
//   .then((spotifyAccessToken) => {
//     console.log("***We have an Access Token 🥳" + spotifyAccessToken);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

console.log(spotifyAccessToken)
console.log("This is running**************")

//END of Spotify call

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('spotifyAccessToken', body.access_token)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log(spotifyAccessToken)
// console.log("waiting for 1 second...");
// setTimeout(() => {
//   console.log(spotifyAccessToken);
// }, 1000);
// console.log("This is the end**************🏁")

module.exports = app;