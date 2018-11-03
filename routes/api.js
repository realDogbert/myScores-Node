require('dotenv').config();

var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect(process.env.DB_CONN, 
  { useNewUrlParser: true }, 
  (err, client) => {

  if (err) return console.log(err);
  db = client.db('scores');

});

router.get('/', function(req, res, next) {
  res.render('clubs', { title: 'myScores' });
});

router.get('/clubs', function(req, res, next) {
  db.collection('clubs').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(JSON.stringify({ clubs: result }))
  })
});

router.post('/clubs', function(req, res, next) {

  console.log("Body " + req.body.clubName);
  db.collection('clubs').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
  });
  res.redirect('/clubs');

});

module.exports = router;
