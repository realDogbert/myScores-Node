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


controller.get = function(search, callback) {

    var query = null;
    if (search) {
        query = {
            name: { 
                $regex: search ,
                $options: "$i",
            }
        }
    }

    var options = {
        sort: ["name"]
    };

    db.collection(collection).find(query, options).toArray(callback);

}

controller.getByID = function(id, callback) {

    db.collection(collection).findOne(  
        {"_id": new ObjectID(id)}, 
        callback
    );

}

controller.create = function(req, res) {
    db.collection(collection).insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
    });
    res.redirect('/clubs');
}

controller.delete = function(req, res) {
    db.collection(collection).deleteOne(  {"_id": new ObjectID(req.params.id)}, function(err, document) {
        res.json(document)
    });
}

controller.update = function(id, data, callback) {

    data.dateLastModified = new Date();

    db.collection(collection).updateOne(
        {"_id": new ObjectID(id)},
        { $set: data},
        callback
    );
}



module.exports = controller;