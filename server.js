const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
// const routes = require("");

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    });
});