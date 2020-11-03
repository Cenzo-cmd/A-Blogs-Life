$(document).ready(() => {

    //Do NOT change to arrow functions!
    $(".likeButton").on("click", function(event) {
        event.preventDefault();
        console.log(this);
    });

    $(".commentButton").on("click", function(event) {
        event.preventDefault();
        console.log(this);
    });
});