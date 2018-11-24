var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var clubsRouter = require('./routes/clubs');
var apiRouter = require('./routes/api');

var app = express();

const MongoClient = require('mongodb').MongoClient;
var db;
require('dotenv').config();
MongoClient.connect(process.env.DB_CONN, 
  { useNewUrlParser: true }, 
  (err, client) => {
      if (err) return console.log(err);
      db = client.db('scores');
  }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'pleasereplacethissecret',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    db.collection('users').findOne(  {"name": username}, function(err, document) {
      console.log(document);
      return done(null, document);
    });
  }
));

app.use('/', indexRouter);
app.use('/clubs', clubsRouter);
app.use('/api', apiRouter);

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

module.exports = app;
