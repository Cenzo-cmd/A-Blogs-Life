$(document).ready(() => {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav
  $(".tabs").tabs(); // Materialize functionality for tabs on profile

  //materialize prefill
  M.updateTextFields();

  const firstNameField = $("#first_name");
  const lastNameField = $("#last_name");
  const emailField = $("#email");
  const username = $("#username");
  populateProfileFields();

  function populateProfileFields() {
    $.get("/api/users/userdata", (userData) => {
      // console.log("user data log", userData);
      $("#first_name").text = userData.firstName;
      $("#last_name").text = userData.lastName;
      $("#username").text = userData.username;
      $("#email").text = userData.email;
      localStorage.setItem("id", userData.id);
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

    $.ajax("/api/users/" + localStorage.getItem("id"), { method: "PUT", data: updateQuery }).then(() => {
      window.location.replace("/dashboard");
    });
  });
});
