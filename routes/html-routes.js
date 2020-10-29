const path = require("path");

module.exports = (app) => {
<<<<<<< HEAD
  app.get("/", function (request, response) {
    response.json({ test: "This is the main route" });
  });
};
=======
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
        response.render("dashboard");
    })
}
>>>>>>> 522f49530b667117ca37d2d5eb96fe68bc518852
