const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  ////////// C - Create - Create new post
  //create blog post  ***ADD REDIRECT IF NECESSARY
  app.post("/api/BlogPost", (request, response) => {
    const { title, body } = request.body;

    db.BlogPost.create({
      title,
      body,
    })
      .then((result) => {
        response.send(`blog named ${title} with a body ${body} created`);
      })
      .catch((err) => {
        response.status(401).json(err);
      });
  });

  ////////// R - Read - Get one or all posts

  ////////// U - Update - Change title or content of post?

  ////////// D - Delete (Destroy) - Delete one or all posts
};
