$(document).ready(function() {

    var form = $('form');
    form.submit( function(event) {

        var form = $(this);
        var params = form.serializeArray();
        var userId = params[0].value;
        var isAdmin = $("input[type='checkbox']").is(":checked");

        event.preventDefault();
        var form = $(this);
        $.ajax({
            headers: {
                'X-API-Key': apiKey
            },
            method: "PUT",
            url: "/api/users/" + userId,
            data: {
                "name": params[1].value,
                "email": params[2].value,
                "realName": params[3].value,
                "isAdmin": isAdmin
            },
        })
        .done(function(data) {
            alert("Changes for " + params[1].value + " have been saved.");
        })
        .fail(function() {
            alert("error");
        });

    });

    $('#cancel').click(function() {
        window.location.href = "/admin/users/"
    })
    
});

