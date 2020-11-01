$(document).ready(() => {
    //  This is the add friend button
    $(".addFriend").on("click", event => {
        event.preventDefault();
        console.log('clicked');

    });

    // This is the view profile button
    $(".viewProfile").on("click", event => {
        event.preventDefault();
        console.log("clicked this on");
    });

});