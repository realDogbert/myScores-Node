$(document).ready(function() {

    $.ajax({
        url: "/api/courses/" + $("#course_id").val()
    })
    .done(function(json) {
        $("#course_name").html(json.course.name);
        $.each(json.holes, function(idx, hole) {
            $("#holes").append(
                $("<tr>")
                .append($("<td>").html(idx+1))
                .append($("<td>").html(hole.length.man))
                .append($("<td>").html(hole.par))
                .append($("<td>").html(hole.length.woman))
                .append($("<td>").html(hole.hcp))
                .append($("<td>").append(
                    $("<input>").attr({
                        "name": "hole[]",
                        "type": "number"})
                ))
            );
        })
    })
    .fail(function(error) {
        console.log(error);
        alert("error");
    }); 

    $("form").submit( function(event){

        event.preventDefault();
        var data = {
            "player_id": $("#user_id").val(),
            "course_id": $("#course_id").val(),
            "course_name": $("#course_name").text(),
            "score": $('input[name="hole[]"]').map(function(){return Number($(this).val());}).get()
        };

        $.ajax({
            method: "POST",
            url: "/api/rounds",
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

    $('#cancel').click(function() {
        window.location.href = "/user/";
    })
})