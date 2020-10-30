$(document).ready(function() {
    $('.sidenav').sidenav(); // Materialize functionality for sidenav
    $('.tabs').tabs(); // Materialize functionality for tabs on profile
    // $('#textarea1').val('New Text');
    // M.textareaAutoResize($('#textarea1'));

    $('input#input_text, textarea#textarea2').characterCounter();
});