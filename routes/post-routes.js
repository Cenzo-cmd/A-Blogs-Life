const db = require("../models");
const passport = require("../config/passport");

module.exports = async(app) => {
    try {
        await app.post("/api/login", (request, response) => {

            response.json(request);
        })

    } catch (error) {
        if (error) console.error(error.message);
    }

}