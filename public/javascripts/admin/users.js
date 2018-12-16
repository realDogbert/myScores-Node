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
            .append($("<th>").html("Name"))
            .append($("<th>").html("EMail"))
        );

        $tbody = $("<tbody>");
        $.each(data, (idx, user) => {
            $tbody
                .append($('<tr>')
                    .append($('<td>').html(user.name))
                    .append($('<td>').html(user.email))
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