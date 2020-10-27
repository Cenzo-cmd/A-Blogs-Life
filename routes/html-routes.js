const path = require("path");

module.exports = async(app) => {
    app.get("/", function(request, response) {
        response.json({ test: 'This is the main route' })
    });
}