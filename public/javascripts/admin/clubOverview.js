$(document).ready(function() {

    $("#clubNew").click(function() {
        window.location.href = "/admin/addClub"
    });

    $("#search").on("keyup paste", function() {
    
        var searchText = $("#search").val();

        $.ajax({
            headers: {
                'X-API-Key': apiKey
            },
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
    var line = $("<tr>");
    line.append($("<td>").append($("<a>").attr("href", "/admin/clubs/" + club._id).html(club.name))); 
    line.append($("<td>").html(club.address.street + "<br>" + club.address.zip + " " + club.address.country));
    line.append($("<td>").html(club.contact.website));
    return line;
}