$(document).ready(() => {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  $(".tabs").tabs(); // Materialize functionality for tabs on profile

  //Where blog posts live on the page
  const blogPostsEl = $("#blog-posts");

  //unused function right now
  // function handleLoginErr(err) {
  //   $("#alert .msg").text(err.responseJSON);
  //   $("#alert").fadeIn(500);
  // }

  document.title = "It's a Blog's Life";
  populateBlogPosts();

  //grab blog posts associated with this user and render them on the page as cards
  //TODO: does this need try/catch?
  function populateBlogPosts() {
    console.log("I'm populating blog posts!");
    $.get("/api/blogposts/", (data) => {
      console.log(data);
      data.forEach((blogPost) => {
        console.log(blogPost.title);
        console.log(blogPost.body);
        const newPost = `
        <div class="row" id="blog-post-${blogPost.id}">
        <div class="card blue-grey darken-1 col m10">
            <div class="card-content white-text">
                <span class="card-title">${blogPost.title}</span>
                <p>${blogPost.body}</p>
            </div>
        </div>
        <div class="col m2" style="padding-top: 3rem; padding-left: 1rem">
    
            <a id="testTrigger" data-target="modal${blogPost.id}" class="waves-effect waves-light btn modal-trigger"
                href="#modal${blogPost.id}">Edit Post</a>
            <div id="modal${blogPost.id}" class="modal">
                <div class="modal-content">
    
                    <form class="update-blogPost-form" data-id=${blogPost.id}>
                 
                        <input value="${blogPost.title}" id="title" type="text" class="validate">
                        <label class="active" for="title">title</label>
    
                        <input value="${blogPost.body}" id="body" type="text" class="validate">
                        <label class="active" for="body">body</label>
                         <br>
                        <button style = "margin-left: 5rem" class="btn waves-effect waves-light" type="submit" name="action">Update Post
                        <i class="material-icons right">send</i>
                        </button>
    
                    </form>
                </div>
            </div>
        </div>
    </div>
    
            `;
        blogPostsEl.append(newPost);
      });

      M.Modal.init(document.querySelectorAll(".modal"));
    });
    // .catch(handleLoginErr());
  }

  $(".modal").modal();
  M.updateTextFields();

  // //event listener for "submit post edits" buttons
  $(document).on("submit", ".update-blogPost-form", (event) => {
    event.preventDefault();
    console.log("I HEAR YOU'RE TRYING TO UPDATE A POST");
    const updateQuery = {
      title: $("#title").val(),
      body: $("#body").val(),
      // eslint-disable-next-line camelcase
      blogPost_id: event.currentTarget.dataset.id,
    };
    console.log("updateQuery", updateQuery);

    // $.put("/api/blogposts", updateQuery, (results) => {
    //   window.location.replace("/dashboard");
    // });

    $.ajax("/api/blogposts", { method: "PUT", data: updateQuery }).then(() => {
      window.location.replace("/dashboard");
    });
  });
});
