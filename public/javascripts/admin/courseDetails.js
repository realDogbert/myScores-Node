$(document).ready(function() {

    var courseId = $("#course_id").val();
    
    $.ajax({
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

        $.each(json.holes, function (idx, hole) {
            $("#holesForm").append(
                createTableRow(idx, hole.par, hole.hcp, hole.length)
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
                length: {
                    man: Number($("#lengthMan_" + i).val()),
                    woman: Number($("#lengthWoman_" + i).val())
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
            holes: holesArray
        };

        $.ajax({
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
        window.location.href = "/admin/clubs"
    });

    

});



function createTableRow(idx, par, hcp, length) {
    return $("<tr>")
        .append($("<th>").html(idx+1))
        .append($("<td>").append(createInput(idx, par, "par")))
        .append($("<td>").append(createInput(idx, hcp, "hcp")))
        .append($("<td>").append(createInput(idx, length.man, "lengthMan")))
        .append($("<td>").append(createInput(idx, length.woman, "lengthWoman")))
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