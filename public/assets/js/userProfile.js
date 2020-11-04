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
    const commentButtonId = $(this).data("value");
    const commentArea = $(".appendCommentSection" + $(this).data("value"));
    commentArea.empty();
    const commentSection = `
    <div class="card-action">
            <form class="col s12 new-comment-form addComments${commentButtonId}">
              <div class="row">
                <section id="comments" class="col s12 m12">
                </section>
                <div class="input-field col s10">
                  <textarea id="textarea1" class="white-text materialize-textarea comment-input"></textarea>
                  <label for="textarea1">Comment</label>
                </div>
                <button data-value="${commentButtonId} "class="btn waves-effect waves-light commentSubmit" type="submit" name="action">Submit
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </form>
    </div>
    `;
    commentArea.append(commentSection);
  });

  $(document).on("click", ".commentSubmit", function (event) {
    event.preventDefault();
    console.log(this);
    const submitButtonId = $(this).data("value");
    console.log(submitButtonId);
    const commentBody = $("#textarea1").val().trim();
    const data = {
      value: commentBody,
      postId: submitButtonId,
    };
    $.ajax("/api/BlogPosts/comment", {
      method: "POST",
      data,
    }).then(() => {
      // const commentArea = $(".appendCommentSection" + $(this).data("value"));
      window.location.reload();
    });
  });
});
