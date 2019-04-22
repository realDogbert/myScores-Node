$(document).ready(function() {

    $.ajax({
        headers: {
            'X-API-Key': apiKey
        },
        method: "GET",
        url: "/admin/statistics"
    })
    .done(function(json) {
        $("#numUsers").html(json.users);
        $("#numClubs").html(json.clubs);
        $("#numCourses").html(json.courses);
    })
    .fail(function(error){

    });

});