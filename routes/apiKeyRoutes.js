var express = require('express');
var router = express.Router();

var controller = require('../controllers/adminController');
var jwt = require('jsonwebtoken');

const template = 'admin/apiKey/index';

router.get('/', (req, res, next) => {
    

    controller.getAPIKeys()
    .then(
        result => {
            res.render('admin/apiKey/index', { 
                title: 'API Key Management', 
                token: result
            });
        },
        error => {
            res.render( template, {
                title: 'API Key Management',
                error: error
            } );
        }
    );


});

router.post('/create', (req, res, next) => {

    var payload = {
        iss: process.env.ISSUER_APIKEY,
        aud: req.body.aud
    }
    var token = jwt.sign(payload, process.env.SECRET_APIKEY);
    controller.saveAPIKey(
        {
            payload: payload,
            token: token,
            dateCreated: new Date(),
            dateLastModified: new Date()
        }
    )
    .then(
        result => {
            res.redirect('/admin/apiKey');
        },
        error => {
            res.render( template, {
                title: 'API Key Management',
                error: error
            } );
        }        
    );


});

router.get('/verify', (req, res, next) => {
    console.log(req.query.id);

    controller.getAPIKeyByID(req.query.id)
    .then(
        result => {
            console.log(jwt.verify(result.token, process.env.SECRET_APIKEY));
            res.redirect('/admin/apiKey');
        },
        error => {
            res.render( template, {
                title: 'API Key Management',
                error: error
            } );
        }
    )

});

module.exports = router;