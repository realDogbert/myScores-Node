var db = require('./dbController');
var controller = new Object();

const roundsCollection = "rounds";

controller.getDashboard = (playerId, courseId) => {

    var promise = new Promise(function(resolve, reject) {

        var database = new db;
        var result = null;
    
        database.connect()
        .then(function() {
            console.log("Database connected");
            var query = {
                player_id: playerId,
                course_id: courseId
            }
            return database.find(roundsCollection, query);
        })
        .then(
            function(data) {
                
                var dashboard = {
                    rounds: [],
                    status: null
                };

                data.forEach((score)=>{
                    dashboard.rounds.push(score.brutto);
                });
                database.close();
                resolve(dashboard);
            },
            function(error) {
                database.close();
                reject(error);
            }
        );

    });

    return promise;

}

module.exports = controller;