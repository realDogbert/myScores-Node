$(document).ready(function() {

    var userId = $('#_id').val();

    $.ajax({
        method: "GET",
        url: "/api/users/" + userId
    })
    .done(function(json) {
        
        $("#email").val(json.email);
        $("#realName").val(json.realName);
        $("#handicap").val(json.handicap);

    })
    .fail(function(error){

    });

    $('form').submit( function(event) {

        event.preventDefault();

        var data = {
            "email": $('#email').val(),
            "realName": $('#realName').val(),
            "handicap": Number($('#handicap').val())
        };

        $.ajax({
            method: "PUT",
            url: "/api/users/" + userId,
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
        .done(function(data) {
            alert("Changes for " + $('#username').text() + " have been saved.");
        })
        .fail(function() {
            alert("error");
        });

    });

    $('#cancel').click(function() {
        window.location.href = "/user/"
    })

})