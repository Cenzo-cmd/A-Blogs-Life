$(document).ready(function () {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  $(".tabs").tabs(); // Materialize functionality for tabs on profile

  //Where blog posts live on the page
  const blogPostsEl = $("#blog-posts");

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  populateBlogPosts();

  //grab blog posts associated with this user and render them on the page as cards
  //TODO: does this need try/catch?
  function populateBlogPosts() {
    console.log("I'm populating blog posts!");
    $.get("/api/blogposts/", (data) => {
      console.log(data);
      data.forEach((blogPost) => {
        let newPost = `
        <div class="row" id="blog-post-${blogPost.id}">
        <div class="card blue-grey darken-1 col m10">
            <div class="card-content white-text">
                <span class="card-title">${blogPost.title}</span>
                <p>${blogPost.body}</p>
            </div>
        </div>
        <div class="col m2" style="padding-top: 3rem; padding-left: 1rem">

        <button class="edit-post-button waves-effect waves-light btn" data-blogPostId=${blogPost.id}>Edit Post</button>
        </div>  
    </div>
      `;
        blogPostsEl.append(newPost);
      });
    });
    // .catch(handleLoginErr());
  }

  //event listener for "Edit a post" buttons
  $(document).on("click", ".edit-post-button", (event) => {
    event.preventDefault();

    const postToEditID = event.currentTarget.dataset.blogpostid;
    console.log("postToEditID", postToEditID);
  });

  //FIXME: Attempting a MODAL for editing content
  //
  //Trigger:
  //  <a class="edit-post-button waves-effect waves-light btn modal-trigger" data-blogPostId=${blogPost.id} href="#modal1">Modal</a>
  //
  //Content:
  //   <div id="modal1" class="modal">
  //   <div class="modal-content">
  //   <div class="input-field col s12">
  //       <input  id="post-title" type="text" class="validate">
  //       <label for="post-title">title</label>
  //     </div>
  //     <div class="input-field col s12">
  //       <input  id="post-body" type="text" class="validate">
  //       <label for="post-body">body</label>
  //     </div>
  //   </div>
  //   <div class="modal-footer">
  //       <button id = "update-blogpost-button-${blogPost.id}" class="update-blogpost-button modal-close waves-effect waves-green btn-flat">Submit</button>
  //   </div>
  // </div>

  //Materialize modal event listener
  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function () {
    $(".modal").modal();
  });
});
