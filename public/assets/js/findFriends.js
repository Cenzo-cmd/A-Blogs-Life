$(document).ready(() => {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  //  This is the add friend button
  $(".addFriend").on("click", function (event) {
    event.preventDefault();
    const followId = $(this).data("value");

    // TODO: add this friend to currentUser following array
    $.ajax("/addFriend/" + followId, {
      method: "POST",
      // eslint-disable-next-line no-unused-vars
    }).then((result) => {
      // console.log("Current user with id of " + result.follower_id + " now follows: " + result.following_id);
      // TODO: Disable button once following
    });
  });

  // This is the view profile button
  //DO NOT CHAGE TO ARROW FUNCTION!!!  Using this
  $(".viewProfile").on("click", function (event) {
    event.preventDefault();
    const userId = $(this).data("value");

    window.location.replace("/dashboard/" + userId);
  });
});
