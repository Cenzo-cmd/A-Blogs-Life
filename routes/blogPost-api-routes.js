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
  // Flexibly update a post, passing in the updated key:value pairing in the request body
  app.put("/api/BlogPosts", (request, response) => {
    db.BlogPost.update(request.body, {
      where: {
        id: request.body.id,
      },
    }).then((dbPostResult) => {
      res.json(dbPostResult);
    });
  });

  ////////// D - Delete (Destroy) - Delete one or all posts
  // Delete a post based on its id
  app.delete("/api/posts/:id", (request, response) => {
    db.BlogPost.destroy({
      where: {
        id: request.params.id,
      },
    }).then((dbPostResult) => {
      res.json(dbPostResult);
    });
  });
};
