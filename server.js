const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 8080;
const passport = require("passport");

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes")(app);
require("./routes/user-api-routes")(app);
require("./routes/blogPost-api-routes")(app);

//TODO: force true to change data structures
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
  });
});