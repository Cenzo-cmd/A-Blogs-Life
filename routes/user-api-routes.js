const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  //login in user with authentication
  app.post("/api/login", passport.authenticate("local"), (request, response) => {
    response.json(request.user);
  });

  ////////// C - Create - Create a new User
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
      .catch((err) => {
        response.status(401).json(err);
      });
  });

  ////////// R - Read - Get one or all  Users

  //TODO:////////// U - Update - Change user information? Profile? Or is this login?

  ////////// D - Delete (Destroy) - Delete one or all Users ( TODO: Probably not all?)
  // delete user
  app.delete("/profile/:id", (request, response) => {
    console.log(request.params);
    db.User.destroy({
      where: {
        id: request.params.id,
      },
    })
      .then((result) => {
        response.json({ id: result });
      })
      .catch((err) => {
        response.status(401).json(err);
      });
  });

  //logout
  app.get("/logout", (request, response) => {
    request.logout();
    response.redirect("/");
  });
};
