var express = require('express');
var request = require("request");
var router = express.Router();

router.get('/', function(req, res, next) {

  request.get("http://localhost:3000/api/clubs", (error, response, body) => {
    if (error) {
      console.log(error);
    }
    const json = JSON.parse(body);
    res.render('clubs', { title: 'myScores', clubs: json});
  });
  
});

module.exports = router;
