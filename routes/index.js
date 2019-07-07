var express = require('express');
var router = express.Router();
var request = require("request");
var passport = require('passport');
var userController = require('../controllers/userController');

const { check, validationResult } = require('express-validator/check');

const bcrypt = require('bcrypt');
const saltRounds = 10;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'myScores', user: req.user });
});

router.get('/clubs', (req, res, next) => {
  res.render('clubs', { title: 'Suche', apiKey: process.env.SCORES_API_KEY});
});

router.get('/clubs/:id', (req, res, next) => {

  var options = {
    url: process.env.BASE_URL + "api/golfclubs/" + req.params.id,
    headers: {
      'X-API-Key': process.env.SCORES_API_KEY
    }
  };

  request.get(options, (error, response, body) => {

    var club = JSON.parse(body);
    var lastModified = new Date(club.dateLastModified).toLocaleString();
    var created = new Date(club.dateCreated).toLocaleString();

    res.render('details', {
        title: 'Club Details',
        club: club,
        lastModified: lastModified,
        created: created,
        user: req.user,
        googleKey: process.env.GOOGLE_API_KEY
    });
  });
  
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'myScores' });
});

router.post('/register', [
  check('username')
    .isLength({min:5}).withMessage('must be at least 5 chars long'),
  check('email').isEmail()
], function(req, res, next) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('register', { title: 'Error', errors: errors.array() });
  }

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    
    var user = new Object();
    user.name = req.body.username;
    user.email = req.body.email;
    user.password = hash;  
  
    userController.create(user)
    .then( result => {
      req.login(result, error => {
        res.render('user/dashboard', { 
          title: 'Dashboard ' + user.name,
          user: user 
        });
      })
    })
    .catch( error => {
      res.render('register', { title: 'Error', errors: err.array() });
    })    

  });
});


router.get('/login', function(req,res, next) {
  res.render('login', { title: 'myScores' });
});

router.post('/login', 
            passport.authenticate('local', { successRedirect: '/user', failureRedirect: '/login' }), 
            function(req,res, next) {

  res.redirect('/user/profile');

});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = router;
