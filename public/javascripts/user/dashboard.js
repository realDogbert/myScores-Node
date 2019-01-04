$(document).ready(function() {

    $.ajax({
        method: "GET",
        url: "/api/courses"
    })
    .done(function(json) {
        $.each(json, function (idx, courses) {
            $("#courseSelector").append(
                $("<option>").attr("value", courses._id).text(courses.name)
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
        url: "/api/rounds?player_id=" + $("#user_id").val()
    })
    .done(function(json){

        $.each(json, function(idx, round) {
            $("#rounds").append($("<tr>")
                .append($("<td>").html(new Date(round.dateCreated).toLocaleString()))
                .append($("<td>").html(round.course_name))
                .append($("<td>").html(round.score.reduce((a,b) => {return a+b}, 0)))
                .append($("<td>").html(round.score))
            )
        });
    })
})