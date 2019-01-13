var controller = require('../controllers/scorecardController');
var assert = require('assert');

var courseHcp = [11,9,5,1,13,7,3,17,15];

describe("Test ScoreCardController", function() {
    it("should get correct Vorgabe with Spielvogabe -47", function() {

        let expected = [3,3,3,3,2,3,3,2,2];
        courseHcp.forEach((value, idx) =>{
            assert.equal(controller.getVorgabe(-47,value), expected[idx]);
            // also test with positiv Spielvorgabe
            assert.equal(controller.getVorgabe(47,value), expected[idx]);
        })

    });
    it("should get correct Vorgabe with Spielvogabe -49", function() {

        let expected = [3,3,3,3,3,3,3,2,2];
        courseHcp.forEach((value, idx) =>{
            assert.equal(controller.getVorgabe(-49,value), expected[idx]);
        })

    });
    it ("should get correct Vorgabe with Spielvorgabe -17", () => {
        
        let expected = [1,1,1,1,1,1,1,1,1];
        courseHcp.forEach((value, idx) =>{
            assert.equal(controller.getVorgabe(-17,value), expected[idx]);
        })

    });
    it ("should get correct Vorgabe with Spielvorgabe -5", () => {
        
        let expected = [0,0,1,1,0,0,1,0,0];
        courseHcp.forEach((value, idx) =>{
            assert.equal(controller.getVorgabe(-5,value), expected[idx]);
        })

    })
})