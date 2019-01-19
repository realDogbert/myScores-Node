require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
var db;
var controller = new Object();


MongoClient.connect(process.env.DB_CONN, 
    { useNewUrlParser: true }, 
    (err, client) => {
        if (err) return console.log(err);
        db = client.db(process.env.DB_NAME);
    }
);

controller.getVorgabe = (spielvorgabe, hcp) => {

    const numberHoles = 18;

    if(!spielvorgabe) spielvorgabe = -54;
    spielvorgabe = Math.abs(spielvorgabe);

    var vorgabe = 0;
    if(spielvorgabe <= numberHoles && spielvorgabe >= hcp) {
        vorgabe++;
    }
    if(spielvorgabe > numberHoles) {
        vorgabe++;
    }
    if(spielvorgabe - numberHoles >= hcp) {
        vorgabe++;
    }
    if(spielvorgabe - (2*numberHoles) >= hcp) {
        vorgabe++;
    }
    return vorgabe;

};

module.exports = controller;