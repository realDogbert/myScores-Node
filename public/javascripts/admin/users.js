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
            .append($("<th>").html("ID"))
            .append($("<th>").html("Name"))
            .append($("<th>").html("EMail"))
            .append($("<th>").html("Name"))
            .append($("<th>").html("Admin"))
        );

        $tbody = $("<tbody>");
        $.each(data, (idx, user) => {
            $tbody
                .append($('<tr>')
                    // .append($('<td>').html(user._id))
                    .append($('<td>').html('<a href="/admin/users/' + user._id + '">' + user._id + '</a>'))
                    .append($('<td>').html(user.name))
                    .append($('<td>').html(user.email))
                    .append($('<td>').html(user.realName))
                    .append($('<td>').html(user.isAdmin))
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
