require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

function DB() {
    this.client = null;
}

DB.prototype.connect = function() {
    var _this = this;
    return new Promise(function(resolve, reject){
        if (_this.client) {
            resolve();
        }
        else {
            var __this = _this;
            MongoClient.connect(process.env.DB_CONN, { useNewUrlParser: true })
            .then(
                function(client){
                    __this.client = client;
                    resolve();
                },
                function(err){
                    console.log(err.message);
                    reject(err.message);
                }
            )
        }
    })
}

DB.prototype.close = function() {
    if (this.client) {
        this.client.close()
        .then(
            function(){},
            function(error){
                console.log(error.message);
            }
        )
    }
}



DB.prototype.find = function(collection, query) {

    var _this = this;
    
    var promise = new Promise(function(resolve, reject) {
        
        var db = _this.client.db(process.env.DB_NAME);
        db.collection(collection).find(query).toArray(function(error, result) {
            if (error) {
                reject(error.message);
            }   
            else {
                resolve(result);
            } 
        });
        
    });

    return promise;

}

DB.prototype.playerStatistics = function(collection, query) {

    var _this = this;
    var db = _this.client.db(process.env.DB_NAME);
    return db.collection(collection, query).find().toArray();

}

DB.prototype.count = function(collection) {

    var _this = this;
    var db = _this.client.db(process.env.DB_NAME);
    
    return db.collection(collection).countDocuments();


}

module.exports = DB;