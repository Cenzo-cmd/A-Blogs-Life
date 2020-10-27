const { request, response } = require("express");

module.exports = (request, response, next) => {
    if (request.user) {
        return next();
    }

    return response.redirect("/");
}