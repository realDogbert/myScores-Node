"use strict";

require('dotenv').config();

const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../models/userModel');
var controller = require('../controllers/userController');

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

var testuser = {
    name: "test",
    email: "test@test.de",
    password: "testpassword",
    handicap: 49
};
var realName = "Frank";
var userid = null;

describe('Test user collection', () => {

    it.skip('Create user with subdocument', done => {

        var user = new User ({
            name: 'NestUser',
            email: 'nested@test.de',
            password: 'xxx',
            isAdmin: false,
            handicap: 49,
            changes: [{
                oldHandicap: 54,
                newHandicap: 49
            }]
        });

        user.save()
        .then(() => {
            User.findOne({name: 'NestUser'}).then( savedUser => {
                assert(savedUser.changes.length === 1);
                done();
            })
        })
        .catch( error => {
            done(error);
        })

    }),

    it.skip('Add new subdocument', done => {

        User.findOne({name: 'NestUser'}).then( user => {
            var numOfChanges = user.changes.length;
            user.changes.push({oldHandicap: 49, newHandicap: 44});
            user.save()
            .then( savedUser => {
                assert(savedUser.changes.length === numOfChanges + 1);
                done();
            })
            .catch( error => {
                done(error);
            })
        })

    }),

    it('should create test user', (done) => {

        controller.create(testuser)
        .then((user) => {

            assert.notEqual(user._id, null);
            assert.equal(user.name, testuser.name, "Expected name to be test");
            assert.equal(user.realName, null, "Expected real name to be null");
            assert(user.changes.length === 1, 'Expected to have one change after creating user');

            userid = user._id;

            done();
        })
        .catch((error) => {
            done(error);
        })

    }),

    it('should find at least one user', (done) => {

        controller.find(null)
        .then((result) => {
            assert.notEqual(result.length, 0, "Expect to find at least one user");
            done();
        })
        .catch((error) => {
            done(error);
        })

    }),

    it('At least one change entry in testuser', done => {

        assert.notEqual(userid, null);
        controller.findById(userid)
        .then( result => {
            assert(result.changes.length > 0, 'Expected at least one change entry');
            done();
        })
        .catch( error => {
            done (error);
        })
    }),

    it('should update test user', (done) => {

        var data = testuser;
        data._id = userid;
        data.email = 'frank@test.de';
        data.realName = realName;

        controller.update(data)
        .then(result => {

            assert.equal(result.name, data.name);
            assert.equal(result.email, data.email);
            assert.equal(result.realName, realName);

            assert.notEqual(result.dateCreated.getTime(), result.dateLastModified.getTime(), "Update date should not be the same as create date.");

            done();
        })
        .catch(error => {
            done(error);
        })

    }),

    it('should delete test user', (done) => {

        controller.deleteById(userid)
        .then((user) => {
            done();
        })    
        .catch((error) => {
            done(error);
        })
    })
})