require('dotenv').config();

var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.render('user/dashboard', {
        title: "Dashboard",
        user: req.user
    })
});


router.get('/profile', (req, res) => {

    if(req.isAuthenticated()) {
        res.render('user/profile', { 
            title: 'User Profile', 
            user: req.user});
    }
    else {
        res.redirect('/login');
    };

});


module.exports = router;