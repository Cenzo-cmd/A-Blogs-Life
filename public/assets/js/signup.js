$(document).ready(function() {
    $('.sidenav').sidenav(); // Materialize functionality for sidenav

    // Getting references to our form and input
    let signUpForm = $("form.signup");
    let email = $("input#email-input");
    let password = $("input#password-input");
    let firstName = $("#first-name");
    let lastName = $("#last-name");
    let reEnterPassword = $("#re-enter-password");

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
            email: email.val().trim(),
            password: password.val().trim()
        };
        console.log(userData);

        // Email and password are validated to not be blank
        if (!userData.email || !userData.password) {
            return;
        }

        $.ajax("/api/signup", {
            method: "POST",
            data: userData
        }).then(function(data) {
            window.location.replace("/dashboard");
        }).catch(handleLoginErr);

        emailInput.val("");
        passwordInput.val("");
    });

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});