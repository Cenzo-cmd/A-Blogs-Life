$(document).ready(function () {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  $(".tabs").tabs(); // Materialize functionality for tabs on profile

  //materialize prefill
  M.updateTextFields();

  let firstNameField = $("#first_name");
  let lastNameField = $("#last_name");
  let emailField = $("#email");
  populateProfileFields();

  function populateProfileFields() {
    console.log("I'm trying to get user data!");
    $.get("/api/users/userdata", (userData) => {
      $("#first_name").text = userData.firstName;
      $("#last_name").text = userData.lastName;
      $("#email").text = userData.email;
    });
  }

  $("#update-profile-form").on("submit", (event) => {
    event.preventDefault();
    const updateQuery = {
      firstName: firstNameField.val().trim(),
      lastName: lastNameField.val().trim(),
      email: emailField.val().trim(),
    };
    //   $.put("/api/users/:id", updateQuery, (results)=>{
    //       results.
    //   })

    $.ajax("/api/users/", { method: "PUT", data: updateQuery }).then((results) => {
      window.location.replace("/dashboard");
    });
  });
});
