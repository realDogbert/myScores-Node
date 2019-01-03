$(document).ready(function() {

    $("form").submit( function(event){

        event.preventDefault();
        
        var data = {
            name: $("#clubName").val(),
            address: {
                street: $("#street").val(),
                zip: $("#zip").val(),
                city: $("#city").val(),
                country: $("#country").val()
            },
            contact: {
                website: $("#website").val(),
                email: $("#email").val(),
                phone: $("#phone").val()
            }
        };

        $.ajax({
            method: "POST",
            url: "/api/clubs/",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
        .done(function(club) {
            window.location.href = "/admin/clubs/" + club._id;
        })
        .fail(function(error) {
            console.log(error);
            alert("error");
        });

    });

    $("#cancel").click(function(){
        window.location.href = "/admin/clubs"
    });

});