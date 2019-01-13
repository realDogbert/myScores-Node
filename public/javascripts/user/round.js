$(document).ready(function() {

    var _holes = [];
    var _scores = [];
    var _sumPar = 0;


    $.ajax({
        url: "/api/courses/" + $("#course_id").val()
    })
    .done(function(json) {
        $("#course_name").html(json.name);
        $.each(json.holes, function(idx, hole) {

            _holes.push(hole);
            _sumPar += hole.par;

            $("#holes").append(
                $("<tr>")
                .append($("<th>").html(idx+1))
                .append($("<td>").html(hole.tee.yellow))
                .append($("<td>").attr("id", "par_"+idx).html(hole.par))
                .append($("<td>").html(hole.tee.red))
                .append($("<td>").html(hole.hcp))
                .append($("<td>").html("///"))
                .append($("<td>").attr("id", "score_"+idx).append(
                    $("<input>")
                    .addClass("form-control-sm")
                    .attr({
                        name: "hole",
                        type: "number"})
                    .change(calculation)
                ))
                .append($("<td>").attr({
                    name: "brutto",
                    id: "brutto_"+idx
                }))
                .append($("<td>").attr({
                    name: "netto",
                    id: "netto_"+idx
                }))
            );
        });
        $("#sumPar").html(_sumPar);
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
            "score": $('input[name="hole"').map(function(){return Number($(this).val());}).get()
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
    });


    var calculation = function() {

        let idx = this.parentNode.id.split("_")[1];
        let par = _holes[idx].par;
        let score = new Number(this.value);
    
        let brutto = (par-score)+5;
        if (brutto < 0) brutto = 0;
        $('td#brutto_'+idx).html(brutto);
    
        let netto = (par-score)+2;
        if (netto < 0) netto = 0;
        $('td#netto_'+idx).html(netto);

        _scores[idx]= {
            "score": score,
            "brutto": brutto,
            "netto": netto
        };

        let sum = calculateSum();
        $("#sum").html(sum.score);
        $("#sumBrutto").html(sum.brutto);
        $("#sumNetto").html(sum.netto);
    }
    
    var calculateSum = function() {
        let sum = 0;
        let brutto = 0;
        let netto = 0;
        _scores.forEach(function(hole){
            sum += hole.score;
            brutto += hole.brutto;
            netto += hole.netto;
        });
        return {
            score: sum,
            brutto: brutto,
            netto: netto
        };
    }

});