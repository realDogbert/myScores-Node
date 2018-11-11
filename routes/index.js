var express = require('express');
var router = express.Router();
var request = require("request");

const { check, validationResult } = require('express-validator/check');

const MongoClient = require('mongodb').MongoClient;
var db;

const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config();

MongoClient.connect(process.env.DB_CONN, 
    { useNewUrlParser: true }, 
    (err, client) => {
        if (err) return console.log(err);
        db = client.db('scores');
    }
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'myScores' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'myScores' });
});

router.get('/login', function(req,res, next) {
  res.render('login', { title: 'myScores' });
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
    
    db.collection('users').insertOne(user, (err, result) => {
      if (err) return console.log(err);
    });

  });


  res.render('register', { title: 'Success' });

});

module.exports = router;
