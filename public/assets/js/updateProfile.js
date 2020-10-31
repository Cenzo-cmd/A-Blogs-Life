$(document).ready(() => {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  $(".tabs").tabs(); // Materialize functionality for tabs on profile

  //materialize prefill
  M.updateTextFields();

  const firstNameField = $("#first_name");
  const lastNameField = $("#last_name");
  const emailField = $("#email");
  populateProfileFields();

  function populateProfileFields() {
    console.log("I'm trying to get user data!");
    $.get("/api/users/userdata", (userData) => {
      $("#first_name").text = userData.firstName;
      $("#last_name").text = userData.lastName;
      $("#username").text = userData.username;
      $("#email").text = userData.email;
    });
  }

  $("#update-profile-form").on("submit", (event) => {
    event.preventDefault();
    const updateQuery = {
      firstName: firstNameField.val().trim(),
      lastName: lastNameField.val().trim(),
      username: username.val().trim(),
      email: emailField.val().trim(),
    };
    //   $.put("/api/users/:id", updateQuery, (results)=>{
    //       results.
    //   })

    $.ajax("/api/users/", { method: "PUT", data: updateQuery }).then(() => {
      window.location.replace("/dashboard");
    });
  });
});
