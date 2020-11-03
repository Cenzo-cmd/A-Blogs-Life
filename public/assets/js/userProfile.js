$(document).ready(() => {

    //Do NOT change to arrow functions!
    $(".likeButton").on("click", function(event) {
        event.preventDefault();
        console.log(this);
        const postToLikeID = this.dataset.value;
        console.log(postToLikeID);
        const data = {
            BlogPostId: postToLikeID
        };
        $.ajax("/api/BlogPosts/like", {
            method: "POST",
            data
            // value: true,
            // BlogPostId: postToLikeID,
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