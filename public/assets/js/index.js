$(document).ready(function() {
    // $(".sidenav").sidenav(); // Materialize functionality for sidenav

    // Getting references to our form and inputs
    let loginForm = $("#submit-button");
    let emailInput = $("input#email-input");
    let passwordInput = $("input#password-input");
    let firstName = $("first-name");
    let lastName = $("last-name");

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", (event) => {
        console.log("you clicled me")
        event.preventDefault();
        const userData = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
        };
        console.log(userData);

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        $.post("/api/login", {
                email: email,
                password: password,
            })
            .then(function() {
                window.location.replace("/members");
            })
            // If there's an error, log the error
            .catch(function(err) {
                console.log(err);
            });
    }
});