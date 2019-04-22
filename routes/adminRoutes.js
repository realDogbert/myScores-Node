require('dotenv').config();

var express = require('express');
var request = require('request');
var router = express.Router();
var controller = require('../controllers/adminController');

router.get('/', (req, res) => {
    res.render('admin/dashboard', {
        title: "Admin Dashboard",
        user: req.user,
        apiKey: process.env.SCORES_API_KEY
    })
});


router.get('/users', (req, res) => {

    if(req.isAuthenticated()) {
    // if(true) {
        res.render('admin/users', { 
            title: 'User Management', 
            user: req.user,
            apiKey: process.env.SCORES_API_KEY
        });
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
                profile: JSON.parse(body),
                apiKey: process.env.SCORES_API_KEY
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
            user: req.user,
            apiKey: process.env.SCORES_API_KEY
        });

    });
  
});

router.get('/clubs/:id', (req, res) => {

    var options = {
        url: process.env.BASE_URL + "api/clubs/" + req.params.id,
        headers: {
            'X-API-Key': process.env.SCORES_API_KEY
        }
    };

    request.get(options, (error, response, body) => {

        var club = JSON.parse(body);
        var lastModified = new Date(club.dateLastModified).toLocaleString();
        var created = new Date(club.dateCreated).toLocaleString();

        res.render('admin/clubDetails', {
            title: 'Club Details',
            club: club,
            lastModified: lastModified,
            created: created,
            user: req.user,
            apiKey: process.env.SCORES_API_KEY
        });

    });
});

router.get('/addClub', (req, res) => {
    res.render('admin/clubDetails', {
        title: 'Add new Club',
        create: true,
        user: req.user,
        apiKey: process.env.SCORES_API_KEY
    });
});


router.get('/courses/:id', (req, res) => {
    res.render('admin/courseDetails', {
        title: "Course Details",
        courseId: req.params.id,
        apiKey: process.env.SCORES_API_KEY    
    })
});

router.get('/addCourse', (req, res) => {
    res.render('admin/courseDetails', {
        title: 'Add new Course',
        create: true,
        clubId: req.query.clubId,
        clubName: req.query.clubName,
        user: req.user,
        apiKey: process.env.SCORES_API_KEY
    });
});

router.get('/statistics', (req, res) => {

    var collections = ["clubs", "courses", "users"];
    var promises = [];
    collections.forEach(collection => {
        promises.push(controller.getStatistics(collection));
    })

    Promise.all(promises)
    .then(
        values => {
            var result = {
                clubs: values[0],
                courses:  values[1],
                users:  values[2]
            }
            res.json(result);
        },
        error => {
            console.log(error);
            res.sendStatus(500)
        }  
    )

});

module.exports = router;