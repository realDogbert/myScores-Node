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
  
});

router.get('/clubs/:id', (req, res) => {

    request.get(process.env.BASE_URL + "api/clubs/" + req.params.id, (error, response, body) => {

        var club = JSON.parse(body);
        var lastModified = new Date(club.dateLastModified).toLocaleString();
        var created = new Date(club.dateCreated).toLocaleString();

        res.render('admin/clubDetails', {
            title: 'Club Details',
            club: club,
            lastModified: lastModified,
            created: created,
            user: req.user
        });

    });
});

router.get('/addClub', (req, res) => {
    res.render('admin/clubDetails', {
        title: 'Add new Club',
        create: true,
        user: req.user
    });
});


router.get('/courses/:id', (req, res) => {
    res.render('admin/courseDetails', {
        title: "Course Details",
        courseId: req.params.id    
    })
});


module.exports = router;