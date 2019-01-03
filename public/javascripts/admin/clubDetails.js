$(document).ready(function() {

    var clubId = $("#club_id").val()

    $.ajax({
        method: "GET",
        url: "/api/courses?club[id]=" + clubId
    })
    .done(function(json) {
        $.each(json, function (idx, course) {
            $("#courses").append(
                $("<tr>")
                    .append($("<td>")
                        .append($("<a>")
                        .attr("href", "/admin/courses/" + course._id)
                        .html(course.course.name)))
                    .append($("<td>").html(course.course.numOfHoles))
            )
        })
    })
    .fail(function(error){

    });

    $("form").submit( function(event){

        event.preventDefault();
        
        var clubId = $("#club_id").val()
        var data = {
            name: $("#clubName").val(),
            location: $("#clubLocation").val()
        };

        $.ajax({
            method: "PUT",
            url: "/api/clubs/" + clubId,
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
        .done(function(data) {
            alert(JSON.stringify(data));
        })
        .fail(function(error) {
            console.log(error);
            alert("error");
        });

    });

    $("#cancel").click(function(){
        window.location.href = "/admin/clubs"
    });

});