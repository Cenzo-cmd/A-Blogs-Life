$(document).ready(() => {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  $(".tabs").tabs(); // Materialize functionality for tabs on profile

  document.title = "It's a Blog's Life";


  M.updateTextFields();
  $(".modal").modal({
    dismissible: false, // Modal cannot be closed by clicking anywhere outside
  });

  // reload page if exiting post edit modal
  $(".close-modal-button").click(() => {
    console.log("closing without saving!");
    window.location.reload();
  });


  // //event listener for "submit post edits" buttons
  $(document).on("submit", ".update-blogPost-form", (event) => {
    event.preventDefault();
    // const blogId = $(this).attr("id").split("-")[1];
    const blogId = event.currentTarget.dataset.id;

    const updateQuery = {
      title: $(`#title-${blogId}`).val(),
      body: $(`#body-${blogId}`).val(),
      // eslint-disable-next-line camelcase
      blogPost_id: blogId,
    };

    // console.log("updateQuery", updateQuery);


    $.ajax("/api/blogposts", { method: "PUT", data: updateQuery }).then(() => {
      window.location.reload();
    });
  });

  // //event listener for "DELETE post" buttons
  $(document).on("click", ".delete-post-btn", (event) => {
    event.preventDefault();
    const blogId = event.currentTarget.dataset.postid;

    $.ajax("api/BlogPosts/" + blogId, { method: "DELETE" }).then(() => {
      window.location.reload();
    });
  });
});
