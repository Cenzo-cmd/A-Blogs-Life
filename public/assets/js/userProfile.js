$(document).ready(() => {
  //Do NOT change to arrow functions!
  $(".likeButton").on("click", function (event) {
    event.preventDefault();
    const postToLikeID = this.dataset.value;
    const updateQuery = { postToLikeID };
    $.ajax("/api/BlogPosts/like", {
      method: "POST",
      // value: true,
      data: updateQuery,
    }).then(() => {
      window.location.reload();
    });
  });

  $(".commentButton").on("click", function (event) {
    event.preventDefault();
    console.log(this);
  });
});
