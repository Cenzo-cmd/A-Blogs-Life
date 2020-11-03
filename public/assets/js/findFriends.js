$(document).ready(() => {
    //  This is the add friend button
    $(".addFriend").on("click", function(event) {
        event.preventDefault();
        const followId = $(this).data("value");
        console.log("Current user id: ", localStorage.getItem("id"));
        
        // TODO: add this friend to currentUser following array
        $.ajax("/addFriend/" + followId, {
            method: "POST"
        }).then((result) => {
            console.log("Current user now follows: " + followId);
        });
    });

    // This is the view profile button
    //DO NOT CHAGE TO ARROW FUNCTION!!!  Using this
    $(".viewProfile").on("click", function(event) {
        event.preventDefault();
        const userId = $(this).data("value");

        window.location.replace("/dashboard/" + userId);
    });

});