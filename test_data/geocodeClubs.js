// node ./test_data/geocodeClubs.js

require('dotenv').config();

var rp = require('request-promise-native');
var geocoder = require('../controllers/geocodingController');

let serviceUri = process.env.BASE_URL + "api/clubs";

var options = {
    uri: serviceUri,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
.then( (result) => {

    
    result.forEach( (element, index) => {

        setTimeout(geocode, index * 500, element);
             
    });
       
})
.catch( (error) => {
    console.log(error);
})

async function geocode(club) {

    var address = club.address.street + " ," + club.address.zip + " " + club.address.city;

    await geocoder.getGeocoding(address)
    .then( (response) => {
        return response.results[0];
        // console.log(address);
        // console.log();
    })
    .then( location => {
        updateClub(club, location);
    })
    .catch( (error) => {
        console.log(error);
    })

}

async function updateClub(club, geocode) {

    let uri = serviceUri + "/" + club._id;
    delete club._id;
    club.geocode = geocode;

    var options = {
        method: 'PUT',
        uri: uri,
        body: JSON.stringify(club),
        headers: {
            'content-type': 'application/json'
        }
    };

    await rp(options)
    .then( result => {
        console.log(result);
    })
    .catch( error => {
        console.log(error);
    })

}

