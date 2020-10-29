const path = require("path");

module.exports = (app) => {
  app.get("/", function (request, response) {
    response.json({ test: "This is the main route" });
  });
};
