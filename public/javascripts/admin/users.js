$(document).ready(function() {

    showUserTable();

    
});

function showUserTable() {

    $.ajax({
        url: "/api/users"
    })
    .done(function(data) {

        $.each(data, (idx, user) => {
            $("#users")
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

    })
    .fail(function() {
        alert("error");
    }); 



}
