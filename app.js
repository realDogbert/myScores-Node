var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

const MongoClient = require('mongodb').MongoClient;
var db;
require('dotenv').config();
MongoClient.connect(process.env.DB_CONN, 
  { useNewUrlParser: true }, 
  (err, client) => {
      if (err) return console.log(err);
      db = client.db(process.env.DB_NAME);
  }
);

// view engine setup
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const bcrypt = require('bcrypt');

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(username, password, done) {

    db.collection('users').findOne(  {name: username}, function(err, document) {
      bcrypt.compare(password, document.password, function(err, response) {
        return done(null, (response)?document:false);
      });
    });
    
  }
));


// Routes for user GUIs
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/userRoutes'));

// Routes for Admin GUIs
app.use('/admin', require('./routes/adminRoutes'));
app.use('/admin/apiKey', require('./routes/apiKeyRoutes'));

// Routes for API
app.use('/api', require('./routes/api'));


// Enabling CORS Pre-Flight
// include before other routes
app.options('*', cors());

// Security: Disable x-powered-by header
// With this option, attackers can't see that this application is buidl with express
app.disable('x-powered-by');

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
