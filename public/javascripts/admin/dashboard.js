$(document).ready(function() {

    $.ajax({
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