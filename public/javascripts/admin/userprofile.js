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
            alert(data);
        })
        .fail(function() {
            alert("error");
        });

    });

    
});

