"use strict";

require('dotenv').config();

const mongoose = require('mongoose');
const assert = require('assert');

const Club = require('../models/golfclubModel');

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

var clubId;

describe('Model test for Golf Club', () => {

    it('Create new golf club', done => {

        var club = new Club({
            name: '--- TEST --- New automated Test',
            description: 'New golf club for automated testing',
            address: {
                street: 'Teststreet 17',
                zip: '80000',
                city: 'Golfcity',
                country: 'Deutschland'
            },
            geometry: {
                location: {
                    lat: 48.11111,
                    lng: 12.02311
                }
            }
        });

        club.contacts.push({
            type: 'email',
            value: 'test@test.de'
        });

        club.contacts.push({
            type: 'web',
            value: 'https://www.test.com'
        });

        

        club.save()
        .then( result => {
            assert.notEqual(result._id, null);
            assert(result.contacts.length === 2, 'Expect club to have at least 2 contacts');
            clubId = result._id;
            done();
        })
        .catch( error => done(error) )

    }),

    it('Add new courses to golf club', done => {

        Club.findOne({ name: '--- TEST --- New automated Test'})
        .then( club => {

            let course1 = { name: 'new test course 1', courseRating: [
                {type: 'red', value: 100 },
                {type: 'yellow', value: 120 }
            ]};
            let course2 = { name: 'new test course 2'};

            club.courses.push(course1);
            club.courses.push(course2);

            club.save()
            .then( updatedClub => {
                assert(updatedClub.courses.length === 2, 'Expect updated club to have 2 courses');
                done();
            })
            .catch( error => done(error));

        })
        .catch( error => done(error) )
        
    }),

    it('Delete golf club', done => {

        assert.notEqual(clubId, null, 'Expect clubId to have a value');
        Club.findByIdAndDelete(clubId)
        .then( result => {
            done();
        })
        .catch( error => done(error) )

    })

})