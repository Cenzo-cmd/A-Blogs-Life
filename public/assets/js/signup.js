$(document).ready(() => {
  $(".sidenav").sidenav(); // Materialize functionality for sidenav

  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const email = $("input#email-input");
  const username = $("input#username-input");
  const password = $("input#password-input");
  const firstName = $("#first-name");
  const lastName = $("#last-name");
  const reEnterPassword = $("#re-enter-password");

  // When the signup button is clicked...
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    console.log(password, reEnterPassword);

    if (password.val().trim() !== reEnterPassword.val().trim()) {
      return;
    }

    const userData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      username: username.val().trim(),
      email: email.val().trim(),
      password: password.val().trim(),
    };
    console.log(userData);

    // Email and password are validated to not be blank
    if (!userData.email || !userData.password) {
      return;
    }

    $.ajax("/api/signup", {
      method: "POST",
      data: userData,
    })
      .then(() => {
        window.location.replace("/dashboard");
      })
      .catch(handleLoginErr);

    email.val("");
    password.val("");
  });

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
