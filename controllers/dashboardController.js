var db = require('./dbController');
var controller = new Object();

const roundsCollection = "rounds";

controller.getDashboard = (playerId, courseId) => {

    if (!playerId) {
        playerId = "5bf9cdcced55037e529da386";
    }
    if (!courseId) {
        courseId = "5c2f712e122f7d0606b7b3b9";
    }

    var promise = new Promise(function(resolve, reject) {

        var database = new db;
    
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
                    course: {
                        name: data[0].course_name
                    },
                    rounds: [],
                    sumScore: [],
                    averageScore: [],
                    statistics: [0,0,0,0,0]
                };

                data.forEach((round) => {
                    for (let i = 0; i < round.score.length; i++) {
                        if (!dashboard.sumScore[i]) { dashboard.sumScore[i]=0 }
                        dashboard.sumScore[i] += round.score[i];

                        dashboard.statistics[round.brutto[i]]++;

                    }
                    dashboard.rounds.push({
                        dateCreated: round.dateCreated,
                        spielvorgabe: round.spielvorgabe,
                        score: round.score,
                        brutto: round.brutto,
                        netto: round.netto
                    });
                });

                dashboard.sumScore.forEach((sum) => {
                    dashboard.averageScore.push(sum / dashboard.rounds.length);
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