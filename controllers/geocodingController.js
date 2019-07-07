var rp = require('request-promise-native');
var controller = new Object();

const URI_GOOGLE_API = "https://maps.googleapis.com/maps/api/geocode/";

controller.getGeocoding = (address) => {

    var serviceUri = URI_GOOGLE_API 
        + "json";

    var options = {
        uri: serviceUri,
        qs: {
            address: address,
            key: process.env.GOOGLE_API_KEY
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options);
}

module.exports = controller;