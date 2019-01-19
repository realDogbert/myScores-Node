var controller = new Object();


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

controller.getScorecard = (spielvorgabe, course) => {

    if(!spielvorgabe) spielvorgabe = -54;
    
    course.holes.forEach((hole, idx) => {
        hole.vorgabe = controller.getVorgabe(spielvorgabe, hole.hcp);
    });
    return course;

}

module.exports = controller;