require('dotenv').config();

var express = require('express');
var request = require("request");
var router = express.Router();


router.get('/', function(req, res, next) {

  if (req.isAuthenticated()) {

    request.get(process.env.BASE_URL + "api/clubs", (error, response, body) => {

      if (error) {
        console.log(error);
      }
      const json = JSON.parse(body);
      res.render('clubs', { title: 'myScores', clubs: json, user: req.user});
    });

  }
  else {
  
    res.render('login', { title: 'login'}); 
  }

});


router.get('/admin', (req, res) => {


  request.get(process.env.BASE_URL + "api/clubs", (error, response, body) => {

    if (error) {
      console.log(error);
    }
    const json = JSON.parse(body);
    res.render('admin/clubs', { 
      title: 'Course Administration', 
      clubs: json, 
      user: req.user});
  });

})

module.exports = router;
