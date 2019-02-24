$(document).ready(function() {

    $.ajax({
        method: "GET",
        url: "/api/courses"
    })
    .done(function(json) {
        $.each(json, function (idx, courses) {
            $("#courseSelector").append(
                $("<option>").attr("value", courses._id).text(courses.name)
            );
        });
    })
    .fail(function() {
        alert("error");
    }); 

    $('#newRound').click(function() {
        window.location.href = "/user/round/" + $("#courseSelector").val();
    });

    $.ajax({
        method: "GET",
        // url: "/api/rounds?player_id=" + $("#user_id").val()
        url: "/api/dashboard/5c2f712e122f7d0606b7b3b9"
    })
    .done(function(json){

        dataset = [];
        dataset.push({
            label: "Par",
            borderColor: "green",
            backgroundColor: "rgba(150, 245, 144)",
            data: [3,4,3,4,3,3,4,3,3]
        });
        dataset.push({
            label: "Average",
            borderColor: "red",
            backgroundColor: "rgba( 240, 131, 104 )",
            data: json.averageScore
        });

        $.each(json.rounds, function(idx, round) {
            $("#rounds").append($("<tr>")
                .append($("<td>").html(new Date(round.dateCreated).toLocaleString()))
                .append($("<td>").html(round.spielvorgabe))
                .append($("<td>").html(json.course.name))
                .append($("<td>").html(round.score.reduce((a,b) => {return a+b}, 0)))
                .append($("<td>").html(round.brutto.reduce((a,b) => {return a+b}, 0)))
                .append($("<td>").html(round.netto.reduce((a,b) => {return a+b}, 0)))
            )

            dataset.push({
                label: new Date(round.dateCreated).toLocaleString(),
                data: round.score
            });
        });

        drawChart(dataset);
        drawPie([{
            backgroundColor: ["red","green","blue","yellow", "gray"],
            data: json.statistics
        }]);

    })

});

function drawChart(data) {

    var ctx = document.getElementById("chart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Hole 1", "Hole 2", "Hole 3", "Hole 4", "Hole 5", "Hole 6", "Hole 7", "Hole 8", "Hole 9"],
            datasets: data
        },
        
    });

}

function drawPie(data) {

    var ctx = document.getElementById("pie").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Double Bogey +", "Bogey", "Par", "Birdie", "Eagle"],
            datasets: data
        },
        
    });

}