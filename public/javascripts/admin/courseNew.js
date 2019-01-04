$(document).ready(function() {

    createTable(Number($("#numOfHoles").val()));

    $("#numOfHoles").change(function() {
        createTable(Number($("#numOfHoles").val()));
    })

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
            method: "POST",
            url: "/api/courses/",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
        .done(function(data) {
            window.location.href = "/admin/clubs/" + $("#clubId").val()
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

function createTable(numOfHoles) {
    $("#holesForm").empty();
    for (var idx=0; idx < numOfHoles; idx++) {
        $("#holesForm").append(
            createTableRow(idx, 0, 0, {man: 0, woman: 0})
        )
    }
}

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