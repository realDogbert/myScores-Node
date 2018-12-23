$(document).ready(function() {

    showUserTable();

    
});

function showUserTable() {

    $.ajax({
        url: "/api/users"
    })
    .done(function(data) {

        $theader = $("<thead>").addClass("thead-dark")
        .append($("<tr>")
            .append($("<th>").html("Login Name"))
            .append($("<th>").html("EMail"))
            .append($("<th>").html("User Name"))
            .append($("<th>").html("Admin Role"))
            .append($("<th>").html("Action"))
        );

        $tbody = $("<tbody>");
        $.each(data, (idx, user) => {
            $tbody
                .append($('<tr>')
                    .append($('<td>').html(user.name))
                    .append($('<td>').html(user.email))
                    .append($('<td>').html(user.realName))
                    .append($('<td>').html(user.isAdmin))
                    .append(
                        $('<td>')
                        .append(
                            $('<button>')
                            .addClass('btn btn-primary')
                            .attr({
                                "type": "button",
                                "value": "Edit" 
                            })
                            .text('Edit')
                            .click(function() {
                                window.location.href = "/admin/users/" + user._id 
                            })                           
                        )
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
            );
        });

        $('#users').append($('<table>').addClass('table table-striped')
            .append($theader)
            .append($tbody));
        
        
    })
    .fail(function() {
        alert("error");
    }); 



}
