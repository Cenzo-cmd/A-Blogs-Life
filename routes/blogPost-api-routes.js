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
        // response.send(`blog named ${title} with a body ${body} created`);
        response.status(201).json(result);
      })
      .catch((err) => {
        response.status(400).json(err);
      });
  });

  ////////// R - Read - Get one or all posts
  //GET ALL blogPosts associated with a particular user
  app.get("/api/BlogPosts/:user_id", (request, response) => {
    const query = {};
    if (request.params.user_id) {
      query.UserID = request.params.user_id;
    }
    db.BlogPost.findAll({
      where: query,
      include: [db.User],
    }).then((dbPostResult) => {
      response.json(dbPostResult);
    });
  });

  // Get ONE BlogPost associated with a particular BlogPost_id
  app.get("/api.BlogPosts/:BlogPost_id", (request, response) => {
    db.BlogPost.findOne({ where: { id: req.params.id }, include: [db.User] }).then((dbPostResult) => {
      response.json(dbPostResult);
    });
  });
  ////////// U - Update - Change title or content of post?

  ////////// D - Delete (Destroy) - Delete one or all posts
};
