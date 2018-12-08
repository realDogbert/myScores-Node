$(document).ready(function(){

    $hole = $("<div></div>");
    for (i = 1; i <= 9; i++) {

        $row = $("<div class='row'></div>");

        $label = $("<div class='col'><label for='Hole " + i + "'>Hole " + i + "</label></div>");
        $row.append($label);
        // $hole.append($label);
       
        $colPar = $("<div class='col'></div>");
        $inputPar = $("<input type='text' class='form-control'></input>");
        $inputPar.attr("name", "hole" + i + ".par");
        $inputPar.attr("placeholder", "Enter Par " + i);
        $colPar.append($inputPar);
        $row.append($colPar);
        // $hole.append($inputPar);

        $colLength = $("<div class='col'></div>");
        $inputLength = $("<input type='text' class='form-control'></input>");
        $inputLength.attr("name", "hole" + i + ".length");
        $inputLength.attr("placeholder", "Enter Length " + i);
        $colLength.append($inputLength);
        $row.append($colLength);
        // $hole.append($inputLength);

        $hole.append($row);

    }
    $('#course').append($hole);

    $("form").submit(function(e){
        alert($("form").serialize());
    });
    
});