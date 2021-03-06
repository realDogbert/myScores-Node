$(document).ready(function() {

    var clubId = $("#club_id").val()

    $.ajax({
        headers: {
            'X-API-Key': apiKey
        },
        method: "GET",
        url: "/api/courses?club.id=" + clubId
    })
    .done(function(json) {
        $.each(json, function (idx, course) {
            $("#courses").append(
                $("<li class='list-group-item'>")
                        .append($("<a>")
                        .attr("href", "/admin/courses/" + course._id)
                        .html(course.name))
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
            description: $("#description").val(),
            rating: Number($("#rating").val()),
            address: {
                street: $("#street").val(),
                zip: $("#zip").val(),
                city: $("#city").val(),
                country: $("#country").val()
            },
            contact: {
                website: $("#website").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                fax: $("#fax").val()
            }
        };

        $.ajax({
            headers: {
                'X-API-Key': apiKey
            },
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

    $("#courseNew").click(function() {
        window.location.href = "/admin/addCourse?clubId=" + $("#club_id").val() + "&clubName=" + $("#clubName").val();
    })

});