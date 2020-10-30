const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
    // main route
    app.get("/", (request, response) => {
        // if (request.user) {
        //     response.redirect("/members");
        // }
        response.render("index");
        // response.sendFile(path.join(__dirname + "../views/index"))
    });

    app.get("/signup", (request, response) => {
        response.render("signup");
    });

    app.get("/dashboard", isAuthenticated, (request, response) => {
        response.render("dashboard");
    });

    app.get("/dashboard/newPost", isAuthenticated, (request, response) => {
        response.render("newPost");
    })
};