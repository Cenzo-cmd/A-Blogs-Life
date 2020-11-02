$(document).ready(() => {
    //  This is the add friend button
    $(".addFriend").on("click", event => {
        event.preventDefault();
        //working

    });

    // This is the view profile button
    //DO NOT CHAGE TO ARROW FUNCTION!!!  Using this
    $(".viewProfile").on("click", function(event) {
        event.preventDefault();
        const userId = $(this).data("value");

        window.location.replace("/dashboard/" + userId);
    });

});