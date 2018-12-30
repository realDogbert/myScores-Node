require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; 
var db;
var controller = new Object();

const collection = "rounds";
const stats = "statistics";

MongoClient.connect(process.env.DB_CONN, 
    { useNewUrlParser: true }, 
    (err, client) => {
        if (err) return console.log(err);
        db = client.db(process.env.DB_NAME);
    }
);

controller.getRoundsByPlayerID = function(playerId, callback) {
    db.collection(collection).find({"player_id": playerId}).toArray(callback);
}

controller.get = function(query, callback) {
    db.collection(collection).find(query).toArray(callback);
}

controller.create = function(round, callback) {

    console.log(round);

    round.dateCreated = new Date();
    round.dateLastModified = new Date();
    
    db.collection(collection).insertOne( round, callback); 
    //     function(error, result) {

            
    //         var playerStat = updateStats(round.player, round.course, round.score);

    //         var newRoundID = result.insertedId;
    //         var statistics = {
    //             "player": round.player,
    //             "course": round.course,
    //             "total": calculateStatistics(round.score)     
    //         };

    //         console.log(statistics);

    //         db.collection(stats).insertOne(statistics, function(error, result) {
    //             db.collection(collection).findOne(  
    //                 {"_id": new ObjectID(newRoundID)}, 
    //                 callback
    //             );
    //         })
    //     }
    // );

};


function updateStats(player, course, score) {

    db.collection(stats).findOne(
        {"player": player, "course": course},
        function(error, result) {
            console.log(result);
            return result;
        }
    );

}

function calculateStatistics(scores) {

    var total = 0;
    for (var i in scores) {
        total = total + scores[i];
    };
    return total;
}

module.exports = controller;