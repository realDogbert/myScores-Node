// Start from root directory with
// node ./test_data/loadClubs.js

require('dotenv').config();

var rp = require('request-promise-native');
const csv = require('csv-parser');  
const fs = require('fs');

const rootDirectory = "./test_data/";
const clubsFile = "golfclubs_deutschland.csv";
const coursesDirectory = "courses/";

const apiClubs = "api/clubs";
const apiCourses = "api/courses";

var clubs = [];

fs.createReadStream(rootDirectory + clubsFile)  
  .pipe(csv())
  .on('data', (row) => {
    clubs.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed. Found %d clubs in CSV', clubs.length);
    clubs.forEach(function(club) {

        // create club from csv data
        var currentClub = {
            name: club.name,
            address: {
                street: club.address_street,
                zip: club.address_zip,
                city: club.address_city,
                country: club.address_country
            },
            contact: {
                website: club.website,
                email: club.contact_email,
                phone: club.contact_phone,
                fax: club.contact_fax,
            }
        };
        var currentCourses = getCoursesForClub(club.id);

        createClub(currentClub)
        .then(function(persistentClub){
            console.log(persistentClub._id);
            currentCourses.forEach(function(course) {
                createCourse(persistentClub, course);
            })
        })
        .catch(function(error){
            console.log(error);
        })
    });
  });


// Read all Courses from directory --coursesDirectory--
// which filename start with the internal club id
// Return array with courses as JSON objects
function getCoursesForClub(clubID) {

    if (!clubID) return [];

    var dir = rootDirectory + coursesDirectory;
    var results = [];
    fs.readdirSync(dir).forEach(function(file) {

        if (file.startsWith(clubID)) {
            file = dir+'/'+file;
            var stat = fs.statSync(file);
    
            if (stat && stat.isDirectory()) {
                results = results.concat(_getAllFilesFromFolder(file))
            } else {
                var course = JSON.parse(fs.readFileSync(file, 'utf8'));
                console.log("Filename %s for Course %s", file, course.name);
                results.push(course);
            }
        }

    });

    return results;

}


function findClub(club) {

    var options = {
        uri: process.env.BASE_URL + "api/clubs?search=" + encodeURIComponent(club.name),
        json: true // Automatically parses the JSON string in the response
    };
     
    rp(options)
        .then(function (response) {
            console.log('Found %d clubs for %s', response.length, club.name);
            console.log('Found %s clubs', response[0]._id);
        })
        .catch(function (err) {
            console.log(err.message);
        });
} 

// Create club by REST call
// Return promise
function createClub(club) {

    var options = {
        method: 'POST',
        uri: process.env.BASE_URL + apiClubs,
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

// Create Course by REST call
// return promise
function createCourse(club, course) {

    // modify course data to match persitent club
    course.club.id = club._id;
    course.club.name = club.name;
  
    var options = {
        method: 'POST',
        uri: process.env.BASE_URL + apiCourses,
        body: course,
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