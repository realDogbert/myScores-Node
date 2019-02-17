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
                    rounds: 0,
                    scores: [],
                    sumScore: [],
                    averageScore: []
                };

                data.forEach((round) => {
                    for (let i = 0; i < round.score.length; i++) {
                        if (!dashboard.sumScore[i]) { dashboard.sumScore[i]=0 }
                        dashboard.sumScore[i] += round.score[i];
                    }
                    dashboard.scores.push(round.score);
                    dashboard.rounds++;
                });

                dashboard.sumScore.forEach((sum) => {
                    dashboard.averageScore.push(sum / dashboard.rounds);
                })

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