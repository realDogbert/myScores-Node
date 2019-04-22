require('dotenv').config();

var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.render('user/dashboard', {
        title: "Dashboard",
        user: req.user,
        apiKey: process.env.SCORES_API_KEY
    })
});


router.get('/profile', (req, res) => {

    if(req.isAuthenticated()) {
        res.render('user/profile', { 
            title: 'User Profile', 
            user: req.user,
            apiKey: process.env.SCORES_API_KEY
        });
    }
    else {
        res.redirect('/login');
    };

});

router.get('/round/:course_id', (req, res) => {

    res.render('user/round', { 
        title: 'User Round', 
        user: req.user,
        course_id: req.params.course_id,
        apiKey: process.env.SCORES_API_KEY
    });

});


module.exports = router;