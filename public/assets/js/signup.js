$(document).ready(function() {
    // $('.sidenav').sidenav(); // Materialize functionality for sidenav

    // Getting references to our form and input
    let signUpForm = $("form.signup");
    let email = $("input#email-input");
    let password = $("input#password-input");
    let firstName = $("#first-name");
    let lastName = $("#last-name");

    // When the signup button is clicked... 
    signUpForm.on("submit", (event) => {
        event.preventDefault();

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
            })
            .then(function(data) {
                window.location.replace("/dashboard");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);

        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the dashboard page
    // Otherwise we log any errors


    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});