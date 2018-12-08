$(document).ready(function(){

    // <div class="form-group">
    // <label for="club name">Course Name</label>
    // <input type="text" class="form-control" name="course[name]" placeholder="Enter the name of the Course">
    // </div>

    $clubNameInput = $("<input>")
    .addClass("form-control")
    .attr("type", "text")
    .attr("name", "course[name]")
    .attr("placeholder", "Enter Name of the Course");

    $clubName = $("<div class='form-group'></div>")
    .append("<label for='courseName'>Course Name</label>")
    .append($clubNameInput);
    

    $("form").append($clubName);

    $hole = $("<div></div>");
    for (i = 0; i < 9; i++) {

        $row = $("<div class='row'></div>");

        $label = $("<div class='col'><label for='Hole " + i + "'>Hole " + (i+1) + "</label></div>");
        $row.append($label);
       
        $colPar = $("<div class='col'></div>");
        $inputPar = $("<input type='text' class='form-control'></input>");
        $inputPar.attr("name", "holes[" + i + "][par]");
        $inputPar.attr("placeholder", "Enter Par");
        $colPar.append($inputPar);
        $row.append($colPar);

        $colLength = $("<div class='col'></div>");
        $inputLength = $("<input type='text' class='form-control'></input>");
        $inputLength.attr("name", "holes[" + i + "][length][man]");
        $inputLength.attr("placeholder", "Enter Length Man");
        $colLength.append($inputLength);
        $row.append($colLength);

        $colLengthWoman = $("<div class='col'></div>");
        $inputLengthWoman = $("<input type='text' class='form-control'></input>");
        $inputLengthWoman.attr("name", "holes[" + i + "][length][woman]");
        $inputLengthWoman.attr("placeholder", "Enter Length Woman");
        $colLengthWoman.append($inputLengthWoman);
        $row.append($colLengthWoman);

        $colHCP = $("<div class='col'></div>");
        $inputHCP = $("<input type='text' class='form-control'></input>");
        $inputHCP.attr("name", "holes[" + i + "][hcp]");
        $inputHCP.attr("placeholder", "Enter HCP");
        $colHCP.append($inputHCP);
        $row.append($colHCP);

        $hole.append($row);

    }
    $("form").append($hole);

{/* <button id="submit" type="submit" class="btn btn-primary">Submit</button> */}

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