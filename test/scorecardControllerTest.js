var controller = require('../controllers/scorecardController');
var assert = require('assert');

var courseHcp = [11,9,5,1,13,7,3,17,15];

describe("Test ScoreCardController", function() {
    it("should get correct Vorgabe with Spielvogabe -47", function() {

        expected = [3,3,3,3,2,3,3,2,2];
        courseHcp.forEach((value, idx) =>{
            assert.equal(controller.getVorgabe(-47,value), expected[idx]);
            // also test with positiv Spielvorgabe
            assert.equal(controller.getVorgabe(47,value), expected[idx]);
        })

    });
    it("should get correct Vorgabe with Spielvogabe -49", function() {

        expected = [3,3,3,3,3,3,3,2,2];
        courseHcp.forEach((value, idx) =>{
            assert.equal(controller.getVorgabe(-49,value), expected[idx]);
        })

    });
    it ("should get correct Vorgabe with Spielvorgabe -17", () => {
        
        expected = [1,1,1,1,1,1,1,1,1];
        courseHcp.forEach((value, idx) =>{
            assert.equal(controller.getVorgabe(-17,value), expected[idx]);
        })

    });
    it ("should get correct Vorgabe with Spielvorgabe -5", () => {
        
        expected = [0,0,1,1,0,0,1,0,0];
        courseHcp.forEach((value, idx) =>{
            assert.equal(controller.getVorgabe(-5,value), expected[idx]);
        })

    });

    it ("should use a default handicap is no handicap is supplied", () => {
        assert.equal(controller.getVorgabe(null,1),3);
    });

    it ("sould return scorecard with spielvorgabe", () => {
        
        let spielvorgabe = -47;
        let course = {
            holes: [
                {par: 3, hcp: 11, expected: 3},
                {par: 4, hcp: 9, expected: 3},
                {par: 3, hcp: 5, expected: 3},
                {par: 3, hcp: 1, expected: 3},
                {par: 3, hcp: 13, expected: 2},
                {par: 4, hcp: 7, expected: 3},
                {par: 3, hcp: 3, expected: 3},
                {par: 3, hcp: 17, expected: 2},
                {par: 3, hcp: 15, expected: 2},
            ]
        };

        controller.getScorecard(spielvorgabe, course);
        course.holes.forEach((hole, idx) => {
            assert.equal(hole.vorgabe, hole.expected)
        });

        controller.getScorecard(null, course);
        course.holes.forEach((hole, idx) => {
            assert.equal(hole.vorgabe, controller.getVorgabe(null, hole.hcp))
        });

    })


});
