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
        window.location.href = "/admin/clubs/" + $("#clubId").val()
    });

    

});

function createTable(numOfHoles) {
    $("#holesForm").empty();
    for (var idx=0; idx < numOfHoles; idx++) {
        $("#holesForm").append(
            createTableRow(idx, 0, 0, {white: 0, blue: 0, red: 0, yellow: 0})
        )
    }
}

function createTableRow(idx, par, hcp, tee) {
    return $("<tr>")
        .append($("<th>").html(idx+1))
        .append($("<td>").append(createInput(idx, tee.white, "teeWhite").attr("style","background-color:#ece4e4")))
        .append($("<td>").append(createInput(idx, tee.blue, "teeBlue").attr("style","background-color:#0000ff4d")))
        .append($("<td>").append(createInput(idx, par, "par")))
        .append($("<td>").append(createInput(idx, tee.red, "teeYellow").attr("style","background-color:#ffff004d")))
        .append($("<td>").append(createInput(idx, tee.yellow, "teeRed").attr("style","background-color:#f003")))
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