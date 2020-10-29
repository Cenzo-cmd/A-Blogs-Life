//WORKING ON THIS ROUTE

$(document).ready(function() {
    // $(".sidenav").sidenav(); // Materialize functionality for sidenav

    // Getting references to our form and inputs
    let loginForm = $(".login");
    let email = $("input#email-input");
    let password = $("input#password-input");

    // When the form is submitted, we validate there's an email and password entered

    loginForm.on("submit", function(event) {
        email = email.val().trim();
        password = password.val().trim();
        event.preventDefault();

        console.log(email, password);

        $.post("/api/login", {
                email: email,
                password: password,
            })
            .then(function() {
                window.location.replace("/dashboard");
            })
            // If there's an error, log the error
            .catch(function(err) {
                console.log(err);
            });

    });
});