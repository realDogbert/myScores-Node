require('dotenv').config();

var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; 
var db;
var controller = new Object();

const collection = "users";

MongoClient.connect(process.env.DB_CONN, 
    { useNewUrlParser: true }, 
    (err, client) => {
        if (err) return console.log(err);
        db = client.db(process.env.DB_NAME);
    }
);


controller.get = function(req, res) {
    db.collection(collection).find().toArray((err, result) => {
        if (err) return console.log(err)
        res.send(JSON.stringify({ users: result }))
    });
}

controller.getByID = function(id, req, res) {
    db.collection(collection).findOne(  {"_id": new ObjectID(id)}, function(err, document) {
        res.send(JSON.stringify({ user: document }))
    });
}

controller.create = function(req, res) {
    db.collection(collection).insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
    });
    res.redirect('/clubs');
}

controller.delete = function(req, res) {
    db.collection(collection).delete(  {"_id": new ObjectID(req.params.id)}, function(err, document) {
        res.send(JSON.stringify({ user: document }))
    });
}


module.exports = controller;