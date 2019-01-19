require('dotenv').config();

var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; 
var db;
var scorecardController = require('./scorecardController');
var controller = new Object();

const clubs = "clubs";
const courses = "courses";

MongoClient.connect(process.env.DB_CONN, 
    { useNewUrlParser: true }, 
    (err, client) => {
        if (err) return console.log(err);
        db = client.db(process.env.DB_NAME);
    }
);


controller.get = function(req, res) {
    db.collection(clubs).find().toArray((err, result) => {
        if (err) return console.log(err)
        res.json(result);
    });
}

controller.getByID = function(id, req, res) {
    db.collection(clubs).findOne(  {"_id": new ObjectID(id)}, function(err, document) {
        res.json(document);
    });
}

controller.create = function(data, callback) {

    data.dateCreated = new Date();
    data.dateLastModified = new Date();

    db.collection(clubs).insertOne(data, callback);
}

controller.delete = function(req, res) {
    db.collection(clubs).deleteOne(  {"_id": new ObjectID(req.params.id)}, function(err, document) {
        res.json(document)
    });
}

controller.update = function(id, data, callback) {

    data.dateLastModified = new Date();
    db.collection(clubs).updateOne(
        {"_id": new ObjectID(id)},
        { $set: data},
        callback
    );
    
};

controller.createCourse = function(data, callback) {

    data.dateCreated = new Date();
    data.dateLastModified = new Date();

    db.collection(courses).insertOne(data, callback);
}

controller.updateCourse = function(id, data, callback) {

    data.dateLastModified = new Date();
    db.collection(courses).updateOne(
        {"_id": new ObjectID(id)},
        { $set: data},
        callback
    );

};

controller.getCourses = function(query, callback) {

    db.collection(courses).find(query).toArray(callback);

};

controller.getCourseByID = function(id, req, res) {
    db.collection(courses).findOne(  {"_id": new ObjectID(id)}, function(err, document) {
        res.json(document);
    });
}

controller.getScorecardByID = function(id, req, res) {
    db.collection(courses).findOne(  {"_id": new ObjectID(id)}, function(err, document) {
        let scorecard = scorecardController.getScorecard(req.query.spielvorgabe, document);
        res.json(scorecard);
    });
}

module.exports = controller;