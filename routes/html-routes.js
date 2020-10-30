const path = require("path");

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

  app.get("/dashboard", (request, response) => {
    console.log("logging request.user from html dashboard route", request.user);
    response.render("dashboard", request.user);
  });
};
