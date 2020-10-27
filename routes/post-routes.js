const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
    //login in user with authentication
    app.post("/api/login", passport.authenticate("local"), (request, response) => {
        response.json(request.user);
    });

    // Create user
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

    //create blog post  ***ADD REDIRECT IF NECESSARY
    app.post("/api/BlogPost", (request, response) => {
        const { title, body } = request.body;

        db.BlogPost.create({
            title,
            body
        }).then(result => {
            response.send(`blog named ${title} witha body ${body} created`)
        }).catch(err => {
            response.status(401).json(err);
        })
    });

    //logout
    app.get("/logout", (request, response) => {
        request.logout();
        response.redirect("/");
    });

    // delete user/ post
    app.delete("/profile/:id", (request, response) => {
        console.log(request.params);
        db.User.destroy({
            where: {
                id: request.params.id
            }
        }).then(result => {
            response.json({ id: result });

        }).catch(err => {
            response.status(401).json(err);
        })
    });



}