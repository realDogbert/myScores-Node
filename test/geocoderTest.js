var geocoder = require('../controllers/geocodingController');
var assert = require('assert');

describe("Test geocoding with Google API", function(){
    it.skip("should retrive geodata for address", function(){

        // console.log("Start");
        geocoder.getGeocoding("Bremer Str. 6 München")
        .then((response) =>{

            assert.equal(response.status, "OK");

            // console.log(response.status);
            // console.log(response.results[0].formatted_address);
            // console.log(response.results[0].geometry.location);
        })
        .catch((error) => {
            console.log(error);
        })
        
    })
})