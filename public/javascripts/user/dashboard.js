$(document).ready(function() {

    $.ajax({
        method: "GET",
        url: "/api/courses"
    })
    .done(function(json) {
        $.each(json, function (idx, courses) {
            $("#courseSelector").append(
                $("<option>").attr("value", courses._id).text(courses.course.name)
            );
        });
    })
    .fail(function() {
        alert("error");
    }); 

    $('#newRound').click(function() {
        window.location.href = "/user/round/" + $("#courseSelector").val();
    });

    $.ajax({
        method: "GET",
        url: "/api/rounds/"
    })
    .done(function(json){
        $.each(json, function(idx, round){
            $("#rounds").append($("<li>")
                .addClass("list-group-item")
                .html(round.dateCreated + ": " + round.course_name));
        });
    })
})