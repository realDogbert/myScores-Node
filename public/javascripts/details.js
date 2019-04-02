$(document).ready(function() {

    $.ajax({
        method: "GET",
        url: "/api/clubs/5c2f707d122f7d0606b7b3b8"
    })
    .done(function(json) {
        $("#name").html(json.name);
        $("#address").html(json.address.street + "<br>" + json.address.zip + " " + json.address.city);
        $("#phone").html(json.contact.phone);
        $("#email").html(json.contact.email);
        $("#website").html(json.contact.website);
    })
    .fail(function(error){

    });



});