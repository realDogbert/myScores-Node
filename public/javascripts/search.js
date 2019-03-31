$(document).ready(function() {


    $("#search").on("keyup paste", function() {
    
        var searchText = $("#search").val();

        $.ajax({
            method: "GET",
            url: "/api/clubs?search=" + searchText,
        })
        .done(function(clubs) {
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
        .append($("<img class='card-img-top' src='https://via.placeholder.com/150x50/000000/FFFFFF/?text=Golf%20Club'>"))
        .append($("<div class='card-body'>")
            .append($("<h5 class='card-title'>").html(club.name))
            .append($("<div class='card-text'>").html(club.address.street + "<br>" + club.address.zip + " " + club.address.country))) 
    
    return card;
}

{/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}