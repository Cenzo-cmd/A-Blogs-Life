$(document).ready(function() {
    $('.sidenav').sidenav(); // Materialize functionality for sidenav
    $('.tabs').tabs(); // Materialize functionality for tabs on profile


    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});