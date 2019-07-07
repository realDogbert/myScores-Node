require('dotenv').config();

const rp = require('request-promise-native');
const csv = require('csv-parser');  
const fs = require('fs');
const geocoder = require('../controllers/geocodingController');

const rootDirectory = './test_data/';
const clubsFile = 'golfclubs_deutschland_20190505.csv';

const apiClubs = 'api/golfclubs';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QiLCJpYXQiOjE1NTY2OTQ1ODR9.LJhx5xdj7IXo3B2O9XMnhV-NtmU6QXWrWSjjrDE8VPw';

var counter = 0;


fs.createReadStream(rootDirectory + clubsFile)  
  .pipe(csv())
  .on('data', (row) => {

    let club = {
        name: row.name,
        address: {
            street: row.address_street,
            zip: row.address_zip,
            city: row.address_city,
            country: row.address_country
        },
        geometry: {
          location: {
              lat: 0,
              lng: 0
          }
        },
        contacts: [
          {type: 'email', value: row.contact_email},
          {type: 'phone', value: row.contact_phone},
          {type: 'web', value: row.website},
          {type: 'fax', value: row.contact_fax}
        ]
    };

    setTimeout(saveClub, 100 * counter, club, counter);      
    
    counter++;

  })
  .on('end', () => {
    console.log('CSV file successfully processed.' + counter);
  });


  function saveClub(club,counter) {

    console.log(counter, club.name);
    geocoder.getGeocoding(club.address.street + ' ' + club.address.zip + ' ' + club.address.city)
    .then(geodata => {

      club.geometry.location.lat = geodata.results[0].geometry.location.lat;
      club.geometry.location.lng = geodata.results[0].geometry.location.lng;
      console.log(club.geometry.location);

      createClub(club)
      .then(result => {console.log('Saved club ' + result.name)})
      .catch(error => {console.log(error)});
    
    })
    .catch(error => console.log(club.name, error))
    
  }


  function createClub(club) {

    var options = {
        method: 'POST',
        uri: process.env.BASE_URL + apiClubs,
        headers: {
          'X-API-Key': apiKey
        },
        body: club,
        json: true // Automatically stringifies the body to JSON
    };

    var promise = new Promise((resolve, reject) => {

        rp(options)
        .then(function (parsedBody) {
            resolve(parsedBody);
        })
        .catch(function (error) {
            reject(error.message);
        });

    });
     
    return promise;

}