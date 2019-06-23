"use strict";

require('dotenv').config();

const mongoose = require('mongoose');
const assert = require('assert');

var controller = require('../controllers/apiKeyController');

// Create mongoose connection before running tests.
before(function (done) {
    mongoose.connect(process.env.DB_CONN, { keepAlive: 1, useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
        done();
    });
});

// After running tests, close connection.
after(function (done) {
    mongoose.connection.close(done);
});


var testApiKey = {
    payload: {
        iss: 'issuer',
        aud: 'aud'
    },
    token: 'new token'
};
var apiKeyId = null;

describe('ApiKey Collection Test', () => {

    it('Create api key', (done) => {

        controller.create(testApiKey)
        .then((apiKey) => {
            assert.notEqual(apiKey, null);
            assert.equal(apiKey.token, testApiKey.token, "Expected name to be new token");
            apiKeyId = apiKey._id;
            done();
        })
        .catch((error) => {
            done(error);
        })

    }),


    it('Find at least one api Key', (done) => {

        controller.find()
        .then((result) => {
            assert.notEqual(result.length, 0, "Expect to find at least apiKey");
            done();
        })
        .catch((error) => {
            done(error);
        })

    }),


    it('Find api key by id', () => {
        controller.findById(apiKeyId)
        .then( apiKey => {
            assert.equal(apiKey.token, testApiKey.token, "Expected name to be new token");
        })
        .catch( error => done(error)) 
    }),
    
    it('Delete api key', (done) => {

        controller.deleteById(apiKeyId)
        .then((apiKey) => {
            done();
        })    
        .catch((error) => {
            done(error);
        })
    })
})