var db = require('../controllers/dbController');
var assert = require('assert');

const rounds = "rounds";

describe("Test mongo interface with promises", function(){
    it("should get at least something", function(){

        console.log("Start");
        var database = new db;
        database.connect()
        .then(function() {
            console.log("Success1");
            var query = {
                player_id: "5bf9cdcced55037e529da386"
            }
            return database.find(rounds, query);
        })
        .then(function(data) {
            console.log("Success2");
            console.log(data);
            database.close();
        })
        .catch(function(error){
            console.log(error);
            database.close();
        })
        
    })
})