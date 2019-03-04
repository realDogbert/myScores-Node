$(document).ready(function() {


    $("#search").on("keyup paste", function() {
    
        var searchText = $("#search").val();

        $.ajax({
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
    var line = $("<tr>");
    line
        .append($('<td>').append($("<a>").attr("href","/admin/users/"+user._id).html(user.name)))
        .append($('<td>').html(user.email))
        .append($('<td>').html(user.realName))
        .append($('<td>').html(user.isAdmin))
        .append(
            $('<td>')
            .append(
                $('<button>')
                .addClass('btn btn-danger')
                .attr({
                    "type": "button",
                    "value": "Delete" 
                })
                .text('Delete')
                .click(function() {
                    
                    $.ajax({
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
