$(document).ready(function() {

    $.ajax({
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
    })
})