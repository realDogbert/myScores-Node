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
        res.render('admin/users/index', { 
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

        var options = {
            url: process.env.BASE_URL + "api/users/" + req.params.id,
            headers: {
                'X-API-Key': process.env.SCORES_API_KEY
            }
        };

        request.get(options, (error, response, body) => {

            if (error) {
              console.log(error);
            }
            json = JSON.parse(body);
            console.log(json);
            res.render('admin/users/detail', { 
                title: 'User Management', 
                user: req.user,
                profile: JSON.parse(body),
                apiKey: process.env.SCORES_API_KEY
            });

          });

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
        res.render('admin/clubs/index', {
            title: 'Course Administration',
            clubs: json,
            user: req.user,
            apiKey: process.env.SCORES_API_KEY
        });

    });
  
});

router.get('/clubs/:id', (req, res) => {

    var options = {
        url: process.env.BASE_URL + "api/golfclubs/" + req.params.id,
        headers: {
            'X-API-Key': process.env.SCORES_API_KEY
        }
    };

    request.get(options, (error, response, body) => {

        var club = JSON.parse(body);

        res.render('admin/clubs/detail', {
            title: 'Club Details',
            club: club,
            lastModified: club.dateCreated,
            created: club.dateLastModified,
            user: req.user,
            apiKey: process.env.SCORES_API_KEY
        });

    });
});

router.get('/addClub', (req, res) => {
    res.render('admin/clubs/details', {
        title: 'Add new Club',
        create: true,
        user: req.user,
        apiKey: process.env.SCORES_API_KEY
    });
});


router.get('/courses/:id', (req, res) => {
    res.render('admin/courses/detail', {
        title: "Course Details",
        courseId: req.params.id,
        apiKey: process.env.SCORES_API_KEY    
    })
});

router.get('/addCourse', (req, res) => {
    res.render('admin/courses/detail', {
        title: 'Add new Course',
        create: true,
        clubId: req.query.clubId,
        clubName: req.query.clubName,
        user: req.user,
        apiKey: process.env.SCORES_API_KEY
    });
});

router.get('/statistics', (req, res) => {

    var collections = ["golfclubs", "courses", "users"];
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