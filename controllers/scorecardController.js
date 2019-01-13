var controller = new Object();


controller.getVorgabe = (spielvorgabe, hcp) => {

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