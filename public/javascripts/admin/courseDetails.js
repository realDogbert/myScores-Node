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
        $("#nav_course").html(json.course.name);
        $("#courseName").val(json.course.name);
        $("#clubName").val(json.club.name);

        $.each(json.holes, function (idx, hole) {
            $("#holesForm").append(
                createTableRow(idx, hole.par, hole.hcp, hole.length)
            )
        })
    })
    .fail(function(error){

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
            name : inputName + "[" + i + "]"
        })
        .val(value);

}