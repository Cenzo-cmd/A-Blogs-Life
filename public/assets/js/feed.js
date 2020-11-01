/* eslint-disable prefer-arrow-callback */
$(document).ready(function () {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  const feedContainer = $("#feed");
  let posts;

  populateMainFeed();

  function populateMainFeed() {
    console.log("Creating a feed of all posts!");
    $.get("/api/users", (data) => {
      console.log("Data:", data);

      data.forEach((user) => {
        posts = user.BlogPosts; // TODO: Add functionality so posts populate in feed by most recent (filter options?)
        posts.forEach((post) => {
          const feed = `
                      <div class="row" id="blogpost-${post.id}">
                          <div class="card">
                              <div class="card-content">
                                  <span class="card-title">${post.title}</span>
                                  <p>${post.body}</p>
                                  <p>by ${user.username}</p>
                              </div>
                          </div>
                      </div>
                      `;

          feedContainer.append(feed);
        });
      });
    });
  }
});
