require('dotenv').config();

var express = require('express');
var router = express.Router();

var clubController = require('../controllers/clubController');
var userController = require('../controllers/userController');


router.get('/', function(req, res, next) {
  res.render('clubs', { title: 'myScores' });
});

router.get('/clubs', function(req, res, next) {
  clubController.get(req, res);
});

router.get('/clubs/:id', function(req,res,next) {
  clubController.getByID(req.params.id, req, res);
});

router.post('/clubs', function(req, res, next) {
  clubController.create(req, res);
});

router.delete('/clubs/:id', function (req, res, next) {
  clubController.delete(req, res);
});




router.get('/users', function(req, res, next) {
  userController.get(req, res);
});

router.get('/users/:id', function(req,res,next) {
  userController.getByID(req.params.id, req, res);
});

router.post('/users', function(req, res, next) {
  userController.create(req, res);
});

module.exports = router;
