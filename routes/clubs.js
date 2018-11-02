var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('clubs', { title: 'myScores' });
});

module.exports = router;
