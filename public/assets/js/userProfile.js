$(document).ready(() => {

    //Do NOT change to arrow functions!
    $(".likeButton").on("click", function(event) {
        event.preventDefault();
        console.log(this);
        const postToLikeID = this.dataset.value;
        console.log(postToLikeID);
        $.ajax("/api/blogposts/like", {
            method: "POST",
            // value: true,
            BlogPostId: postToLikeID,
            // UserID: request.user.id
        }).then(() => {
            window.location.reload();
        });
    });

    $(".commentButton").on("click", function(event) {
        event.preventDefault();
        console.log(this);
    });
});