const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
    app.post("/api/login", passport.authenticate("local"), (request, response) => {
        response.json(request.user);
    });


    app.post("/api/signup", (request, response) => {
        const { email, password, firstName, lastName } = request.body;
        db.User.create({
                firstName,
                lastName,
                email,
                password,
            })
            .then(() => {
                response.redirect(307, "/api/login");
            })
            .catch(err => {
                response.status(401).json(err);
            });
    });

    app.get("/logout", (request, response) => {
        request.logout();
        response.redirect("/");
    });



}