const db = require("../models");
const passport = require("../config/passport");

//TODO: ADD CATCH BLOCKS TO EACH PROMISE CHAIN

module.exports = (app) => {
  ////////// C - Create - Create new post
  //create blog post  ***ADD REDIRECT IF NECESSARY
  app.post("/api/BlogPosts", (request, response) => {
    // AS: changed this to pass the entire request body to the sequel request
    // const { title, body } = request.body;
    // console.log("---------->", title, body);

    db.BlogPost.create(request.body)
      .then((result) => {
        // response.send(`blog named ${title} with a body ${body} created`);
        response.status(201).json(result);
      })
      .catch((err) => {
        response.status(400).json(err);
      });
  });

  ////////// R - Read - Get one or all posts
  //GET ALL blogPosts associated with a particular user, the user ID must be passed in the REQUEST BODY
  app.get("/api/BlogPosts", (request, response) => {
    const query = {};
    if (request.query.UserId) {
      query.UserID = request.query.UserId;
    }

    db.BlogPost.findAll({
      where: query,
      include: [db.User],
    })
      .then((dbPostResult) => {
        response.json(dbPostResult);
      })
      .catch((err) => console.log(err));
  });

  // Get ONE BlogPost associated with a particular BlogPost_id
  app.get("/api/BlogPosts/:BlogPost_id", (request, response) => {
    db.BlogPost.findOne({ where: { id: request.params.BlogPost_id }, include: [db.User] }).then((dbPostResult) => {
      response.json(dbPostResult);
    });
  });

  ////////// U - Update - Change title or content of post?
  // Flexibly update a post, passing in the updated key:value pairing in the request body
  app.put("/api/BlogPosts", (request, response) => {
    db.BlogPost.update(request.body, {
      where: {
        id: request.body.blogPost_id,
      },
    })
      .then((dbPostResult) => {
        response.json(dbPostResult);
      })
      .catch((err) => console.log(err));
  });

  ////////// D - Delete (Destroy) - Delete one or all posts
  // Delete a post based on its id
  app.delete("/api/BlogPosts/:BlogPost_id", (request, response) => {
    db.BlogPost.destroy({
      where: {
        id: request.params.BlogPost_id,
      },
    })
      .then((dbPostResult) => {
        response.json(dbPostResult);
      })
      .catch((err) => console.log(err));
  });
};
