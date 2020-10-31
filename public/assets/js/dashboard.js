$(document).ready(function () {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  $(".tabs").tabs(); // Materialize functionality for tabs on profile

  $("document .modal-trigger").on("click", (event) => {
    console.log("I'm a genius are yuou a genius");
  });
  //Where blog posts live on the page
  const blogPostsEl = $("#blog-posts");

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  document.title = "It's a Blog's Life";
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

            <a id="testTrigger" data-target="modal${blogPost.id}" class="waves-effect waves-light btn modal-trigger" href="#modal${blogPost.id}">Edit Post</a>
            <div id="modal${blogPost.id}" class="modal">
                <div class="modal-content">
                    <h4>${blogPost.title}</h4>
                    <p>${blogPost.body}</p>
                </div>
            </div>
        </div>
    </div>
            `;
        blogPostsEl.append(newPost);
      });

      const elems = document.querySelectorAll(".modal");
      const instances = M.Modal.init(elems);
    });
    // .catch(handleLoginErr());
  }
  // $(document).on("click", "#testTrigger", (event) => {
  //   console.log("YOU CLICKED ME");
  // });

  $(".modal").modal();
  // $("#modal1").modal();

  // <button class="edit-post-button waves-effect waves-light btn" data-blogPostId=${blogPost.id}>Edit Post</button>

  //event listener for "Edit a post" buttons
  $(document).on("click", ".edit-post-button", (event) => {
    event.preventDefault();

    const postToEditID = event.currentTarget.dataset.blogpostid;
    console.log("postToEditID", postToEditID);
  });
  // $(document).on("click", ".modal-trigger", (event) => {
  //   console.log("hiiiiiiiiiiiiiii");
  //   //Materialize modal event listener
  //   $(".modal").modal();
  // });
});
