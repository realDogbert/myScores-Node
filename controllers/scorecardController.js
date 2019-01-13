require('dotenv').config();
var clubController = require('./clubController');
var controller = new Object();


controller.getScorecard = (courseId) => {
    return "Hello";
}

controller.getVorgabe = (spielvorgabe, hcp) => {

    if(!spielvorgabe) spielvorgabe = -54;
    spielvorgabe = Math.abs(spielvorgabe);

    var vorgabe = 0;
    if(spielvorgabe <= 18 && spielvorgabe >= hcp) {
        vorgabe++;
    }
    if(spielvorgabe > 18) {
        vorgabe++;
    }
    if(spielvorgabe -18 >= hcp) {
        vorgabe++;
    }
    if(spielvorgabe -36 >= hcp) {
        vorgabe++;
    }
    return vorgabe;

};

module.exports = controller;