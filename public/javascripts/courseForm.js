$(document).ready(function() {

    $courseName = $("<div>")
        .addClass("form-group")
        .append("<label for='course[name]'>Course Name</label>")
        .append(
            $("<input>")
                .addClass("form-control")
                .attr({
                    type : "text",
                    name : "course[name]",
                    placeholder: "Enter Name of the Course"
                })
            );
    $("form").append($courseName);

    $courseNumOfHoles = $("<div>")
        .addClass("form-group")         
        .append(
            $("<div>")
                .addClass("form-check form-check-inline")
                .append(createRadio("course[numOfHoles]", 9))
                .append(
                    $("<label>").addClass("form-check-label").html("9 Holes")
                )
        )
        .append(
            $("<div>")
                .addClass("form-check form-check-inline")
                .append(createRadio("course[numOfHoles]", 18))
                .append(
                    $("<label>").addClass("form-check-label").html("18 Holes")
                )
        );
    $("form").append($courseNumOfHoles);    
        
    $hole = $("<div>").attr("id", "holes");
    $("form").append($hole);
    createHolesTable(18);

    $submitButton = $("<button>Submit</button>")
        .addClass("btn btn-primary")
        .attr("type", "submit");

    $("form").append($submitButton);



    $("form").submit( function(event){

        var form = $(this);
        $.ajax({
            type: "POST",
            url: '/api/courses',
            data: form.serialize(),
            success: function(data)
            {
                alert(data);
            }
        });

        event.preventDefault();

    });
    
});



function createInput(i, inputType, placeholderText) {
    return $("<input>")
        .addClass("form-control")
        .attr({
            type: "text",
            name : "holes[" + i + "]"+ inputType,
            placeholder : placeholderText
        });
};

function createRadio(radioType, radioValue) {
    return $("<input>")
        .addClass("form-check-input")
        .attr({
            type : "radio",
            name : radioType,
            value : radioValue
        });
}

function createHolesTable(numOfHoles) {

    for (i = 0; i < numOfHoles; i++) {

        $row = $("<div>")
            .addClass("row")
            .append(
                $("<div class='col'><label for='Hole " + i + "'>Hole " + (i+1) + "</label></div>")
            )
            .append(
                $("<div>").addClass("col").append(createInput(i, "[par]", "Enter Par"))    
            )
            .append(
                $("<div>").addClass("col").append(createInput(i, "[length][man]", "Enter Length Man"))    
            )
            .append(
                $("<div>").addClass("col").append(createInput(i, "[length][woman]", "Enter Length Woman"))   
            )
            .append(
                $("<div>").addClass("col").append(createInput(i, "[hcp]", "Enter HCP"))   
            );

        $("#holes").append($row);

    }

}