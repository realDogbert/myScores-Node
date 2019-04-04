$(document).ready(function() {


    $("#search").on("keyup paste", function() {
    
        var searchText = $("#search").val();

        $.ajax({
            method: "GET",
            url: "/api/clubs?search=" + searchText,
        })
        .done(function(clubs) {
            $("#result-header").html("Gefundene Clubs: " +  clubs.length);
            $("#result").html("");
            $.each(clubs, (idx, club) => {
                $("#result").append(createClubLine(club));
            });
        })
        .fail(function(error) {
            console.log(error);
            alert("error");
        });
    
    })

});

function createClubLine(club) {
    var card = $("<div class='card'>");
    card
        .append($("<img class='card-img-top' src='https://source.unsplash.com/300x150/?golf,course&" + club.address.zip + "'>"))
        .append($("<div class='card-body'>")
            .append($("<h5 class='card-title'>")
                .append($("<a>")
                    .attr("href","/clubs/" + club._id)
                    .html(club.name))
            )
            .append($("<div class='card-text'>").html(club.address.street + "<br>" + club.address.zip + " " + club.address.country))) 
    
    return card;
}