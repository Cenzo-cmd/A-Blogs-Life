const db = require("../models");
// const passport = require("../config/passport");

//TODO: ADD CATCH BLOCKS TO EACH PROMISE CHAIN

module.exports = (app) => {
  ////////// C - Create - Create new post
  //create blog post  ***ADD REDIRECT IF NECESSARY
  app.post("/dashboard", (request, response) => {
    // AS: changed this to pass the entire request body to the sequel request
    const { title, body } = request.body;
    //TODO: add escape character to the string (split to compare first)
    const newPost = {
      title,
      body,
      UserId: request.user.id,
    };
    console.log(request.user.id);
    db.BlogPost.create(newPost)
      .then((result) => {
        // response.send(`blog named ${title} with a body ${body} created`);
        response.status(201).json(result);
      })
      .catch((err) => {
        response.status(400).json(err);
      });
  });

  // Create new like
  app.post("/api/BlogPosts/like", (request, response) => {
    const newLike = {
      value: true,
      BlogPostId: request.body.postToLikeID,
      UserId: request.user.id,
    };
    db.Like.create(newLike).then((result) => {
      response.status(201).json(result);
    });
  });

  ////////// R - Read - Get one or all posts //TODO: pretty sure we can delete all of this
  //GET ALL blogPosts associated with a particular user, the user ID must be passed in the REQUEST BODY
  // app.get("/api/BlogPosts", (request, response) => {
  //   const query = {};
  //   if (request.query.UserId) {
  //     query.UserID = request.query.UserId;
  //   }

  ////////// R - Read - Get one or all posts
  // user id is passed in from request.user object
  app.get("/api/BlogPosts", (request, response) => {
    const query = {};
    console.log("this is the user", request.user);
    if (request.user) {
      query.UserId = request.user.id;
    }
    console.log("THIS IS THE QUERY", query);
    db.BlogPost.findAll({
      where: query,
      /////AAS added likes to this endpoint
      include: [db.User, db.Like],
    })
      .then((dbPostResult) => {
        response.json(dbPostResult);
      })
      .catch(() => response.status(404).send());
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
    console.log("request.body.blogPost_id", request.body.blogPost_id);
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
