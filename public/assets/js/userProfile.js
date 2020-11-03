$(document).ready(() => {

    //Do NOT change to arrow functions!
    $(".likeButton").on("click", function(event) {
        event.preventDefault();
        console.log(this);
        const postToLikeID = this.dataset.value;
        console.log(postToLikeID);
        $.ajax("/api/blogposts/like", {
            method: "POST"
        }).then(() => {
            window.location.reload();
        });
    });

    $(".commentButton").on("click", function(event) {
        event.preventDefault();
        console.log(this);
    });
});