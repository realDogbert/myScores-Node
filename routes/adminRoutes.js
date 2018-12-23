require('dotenv').config();

var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/', (req, res) => {
    res.render('admin/dashboard', {
        title: "Admin Dashboard",
        user: req.user
    })
});


router.get('/users', (req, res) => {

    if(req.isAuthenticated()) {
    // if(true) {
        res.render('admin/users', { 
            title: 'User Management', 
            user: req.user});
    }
    else {
        res.redirect('/login');
    };

});


router.get('/users/:id', (req, res) => {

    if(req.isAuthenticated()) {

        request.get(process.env.BASE_URL + "api/users/" + req.params.id, (error, response, body) => {

            if (error) {
              console.log(error);
            }
            json = JSON.parse(body);
            console.log(json);
            res.render('admin/userprofile', { 
                title: 'User Management', 
                user: req.user,
                profile: JSON.parse(body)
            });

          });



    // if(true) {

    }
    else {
        res.redirect('/login');
    };

});

router.get('/clubs', (req, res) => {


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