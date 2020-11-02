$(document).ready(function() {
    const newPostForm = $(".newPostForm");
    $(".sidenav").sidenav(); // Materialize functionality for sidenav
    $(".tabs").tabs(); // Materialize functionality for tabs on profile
    // $('#textarea1').val('New Text');
    // M.textareaAutoResize($('#textarea1'));
    $("input#input_text, textarea#textarea2").characterCounter();

    newPostForm.on("submit", (event) => {
        console.log(this);
        event.preventDefault();
        console.log("clicked");
        const newPost = {
            title: $(".titleInput").val().trim(),
            body: $(".bodyInput").val().trim(),
        };
        console.log(newPost);
        $.ajax("/dashboard", {
            method: "POST",
            data: newPost,
        }).then(() => {
            window.location.replace("/dashboard");
        });
    });
});