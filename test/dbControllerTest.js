var db = require('../controllers/dbController');
var assert = require('assert');

const rounds = "rounds";

describe("Test mongo interface with promises", function(){
    it.skip("should get at least something", function(){

        console.log("Start");
        var database = new db;
        database.connect()
        .then(function() {
            var query = {
                player_id: "5bf9cdcced55037e529da386",
                course_id: "5c2f712e122f7d0606b7b3b9"
            }
            return database.find(rounds, query);
        })
        .then(function(data) {
            console.log(data);
            database.close();
        })
        .catch(function(error){
            console.log(error);
            database.close();
        })
        
    })
})