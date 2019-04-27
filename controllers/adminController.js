require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; 
var db;
var controller = new Object();


MongoClient.connect(process.env.DB_CONN, 
    { useNewUrlParser: true }, 
    (err, client) => {
        if (err) return console.log(err);
        db = client.db(process.env.DB_NAME);
    }
);

controller.getStatistics = (collection) => {

    var promise = new Promise((resolve, reject) => {

        db.collection(collection).countDocuments()
        .then(
            result => resolve(result),
            error => reject(error)
        )

    });

    return promise;
    
};

controller.saveAPIKey = apiKey => {
    return db.collection('apiKeys').insertOne(apiKey);
}

controller.getAPIKeys = () => {
    return db.collection('apiKeys').find().toArray();
}

controller.getAPIKeyByID = id => {
    return db.collection('apiKeys').findOne({"_id": new ObjectID(id)});
}

controller.deleteAPIKeyByID = id => {
    return db.collection('apiKeys').findOneAndDelete({"_id": new ObjectID(id)});
}

module.exports = controller;