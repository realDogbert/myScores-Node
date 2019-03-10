$(document).ready(function() {

    $.ajax({
        method: "GET",
        url: "/api/dashboard/statistics"
    })
    .done(function(json) {

        $("#numOfRounds").html(json.statistics.rounds);
        $("#numOfStrokes").html(json.statistics.strokes);
        $("#bruttoPar").html(
            ((json.statistics.bruttoPar/json.statistics.holes)*100).toFixed(2) + " %"
        );

        $.each(json.rounds, function (idx, round) {
            appendRound(round);    
        });

    })
    .fail(function() {

        alert("error");

    }); 

});

function appendRound(round) {
    $("#rounds").append($("<tr>")
    .append($("<td>").html(new Date(round.dateCreated).toLocaleString()))
    .append($("<td>").html(round.spielvorgabe))
    .append($("<td>").html(round.course_name))
    .append($("<td>").html(round.score.reduce((a,b) => {return a+b}, 0)))
    .append($("<td>").html(round.brutto.reduce((a,b) => {return a+b}, 0)))
    .append($("<td>").html(round.netto.reduce((a,b) => {return a+b}, 0)))
)
}