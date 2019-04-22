$(document).ready(function() {

    var courseId = $("#course_id").val();
    
    $.ajax({
        headers: {
            'X-API-Key': apiKey
        },
        method: "GET",
        url: "/api/courses/" + courseId
    })
    .done(function(json) {

        $("#nav_club")
            .attr("href", "/admin/clubs/" + json.club.id)
            .html(json.club.name);
        $("#nav_course").html(json.name);
        $("#courseName").val(json.name);
        $("#clubId").val(json.club.id);
        $("#clubName").val(json.club.name);

        $("#crWhite").val(json.cr.white);
        $("#crBlue").val(json.cr.blue);
        $("#crYellow").val(json.cr.yellow);
        $("#crRed").val(json.cr.red);

        $("#slWhite").val(json.sl.white);
        $("#slBlue").val(json.sl.blue);
        $("#slYellow").val(json.sl.yellow);
        $("#slRed").val(json.sl.red);

        $.each(json.holes, function (idx, hole) {
            $("#holesForm").append(
                createTableRow(idx, hole.par, hole.hcp, hole.tee)
            )
        })
    })
    .fail(function(error){

    });

    $("form").submit( function(event){

        event.preventDefault();

        var holesArray = [];
        for (var i = 0; i < 9; i++) {
            holesArray.push({
                par: Number($("#par_" + i).val()),
                hcp: Number($("#hcp_" + i).val()),
                tee: {
                    white: Number($("#teeWhite_" + i).val()),
                    blue: Number($("#teeBlue_" + i).val()),
                    red: Number($("#teeRed_" + i).val()),
                    yellow: Number($("#teeYellow_" + i).val())
                }
            });
        }
        
        var data = {
            name: $("#courseName").val(),
            numOfHoles: $("#numOfHoles").val(),
            club: {
                id: $("#clubId").val(),
                name: $("#clubName").val()
            },
            cr: {
                white: Number($("#crWhite").val()),
                blue: Number($("#crBlue").val()),
                yellow: Number($("#crYellow").val()),
                red: Number($("#crRed").val())
            },
            sl: {
                white: Number($("#slWhite").val()),
                blue: Number($("#slBlue").val()),
                yellow: Number($("#slYellow").val()),
                red: Number($("#slRed").val())
            },
            holes: holesArray
        };

        $.ajax({
            headers: {
                'X-API-Key': apiKey
            },
            method: "PUT",
            url: "/api/courses/" + courseId,
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
        window.location.href = "/admin/clubs/" + $("#clubId").val()
    });

    

});



function createTableRow(idx, par, hcp, tee) {
    return $("<tr>")
        .append($("<th>").html(idx+1))
        .append($("<td>").append(createInput(idx, tee.white, "teeWhite").attr("style","background-color:#ece4e4")))
        .append($("<td>").append(createInput(idx, tee.blue, "teeBlue").attr("style","background-color:#0000ff4d")))
        .append($("<td>").append(createInput(idx, par, "par")))
        .append($("<td>").append(createInput(idx, tee.yellow, "teeYellow").attr("style","background-color:#f003")))
        .append($("<td>").append(createInput(idx, tee.red, "teeRed").attr("style","background-color:#ffff004d")))
        .append($("<td>").append(createInput(idx, hcp, "hcp")))
}

function createInput(i, value, inputName) {

    return $("<input>")
        .addClass("form-control")
        .attr({
            type: "number",
            id : inputName + "_" + i,
            name : inputName + "_" + i
        })
        .val(value);

}