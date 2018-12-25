$(document).ready(function() {

    var form = $('form');
    form.submit( function(event) {

        var form = $(this);
        var params = form.serializeArray();
        var userId = $('#_id').val();

        event.preventDefault();
        var form = $(this);
        $.ajax({
            method: "PUT",
            url: "/api/users/" + userId,
            data: {
                "email": $('#email').val(),
                "realName": $('#realName').val()
            },
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