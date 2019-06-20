$(document).ready(function() {


    $("#search").on("keyup paste", function() {
    
        var searchText = $("#search").val();

        $.ajax({
            headers: {
                'X-API-Key': apiKey
            },
            method: "GET",
            url: "/api/users?search=" + searchText,
        })
        .done(function(users) {
            $("#users").html("");
            $.each(users, (idx, user) => {
                $("#users").append(createUserLine(user));
            });
        })
        .fail(function(error) {
            console.log(error);
            alert("error");
        });
    
    })

    showUserTable();


});

function showUserTable() {

    $.ajax({
        headers: {
            'X-API-Key': apiKey
        },
        url: "/api/users"
    })
    .done(function(data) {

        $.each(data, (idx, user) => {
            $("#users").append(createUserLine(user));
        });

    })
    .fail(function() {
        alert("error");
    }); 

}

function createUserLine(user) {

    // var admin = user.isAdmin ? 'Admin':'User';
    var line = $("<tr>");
    line
        .append($('<td>').append($("<a>").attr("href","/admin/users/"+user._id).html(user.name)))
        .append($('<td>').html(user.email))
        .append($('<td>').html(user.realName))
        .append($('<td>').html(user.isAdmin ? 'Admin':'User'))
        .append(
            $('<td>')
            .append(
                $('<i>')
                .addClass('material-icons')
                .text('delete')
                .click(function() {
                    
                    $.ajax({
                        headers: {
                            'X-API-Key': apiKey
                        },
                        method: "DELETE",
                        url: "/api/users/" + user._id
                    })
                    .done(function(data) {
                        window.location.href = "/admin/users/"
                    })
                    .fail(function() {
                        alert("error");
                    });

                })
            )
        )
    return line;
}
