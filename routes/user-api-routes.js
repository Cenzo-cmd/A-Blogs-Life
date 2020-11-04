const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const gravatar = require("gravatar");
// const { request, response } = require("express");

module.exports = (app) => {
  //login in user with authentication
  app.post("/api/login", passport.authenticate("local"), (request, response) => {
    response.json(request.user);
  });

  ////////// C - Create - Create a new User
  app.post("/api/signup", (request, response) => {
    const { email, password, username, firstName, lastName } = request.body;
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    db.User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      avatar,
    })
      .then(() => {
        response.redirect(307, "/api/login");
      })
      .catch((err) => {
        response.status(401).json(err);
      });
  });

  ////////// R - Read - Get one or all  Users

  //Get ALL Users AND their associated BlogPosts
  //TODO: change this to all users? is that RESTful?
  app.get("/api/users", (request, response) => {
    // "include" in findAll will join,
    //  equivalent of  SELECT * FROM Users LEFT OUTER JOIN BlogPosts ON Users.id = BlogPosts.user_id;
    db.User.findAll({
      //TODO: Make sure this works AAS
      include: [db.BlogPost],
    }).then((dbUser) => {
      response.json(dbUser);
    });
  });

  //endpoint to grab one user's profile information
  app.get("/api/users/userdata", (request, response) => {
    // "include" in findOne will join,
    // equivalent of SELECT * FROM users LEFT OUTER JOIN blogposts ON users.id = blogposts.user_id WHERE id = ${request.params.id} LIMIT 1;
    db.User.findOne({
      where: { id: request.user.id },
      //TODO: Why is it only returning one?
      include: [db.BlogPost],
    }).then((dbUser) => {
      response.json(dbUser);
    });
  });

  //Get ONE User AND their associated BlogPosts
  app.get("/api/users/:id", (request, response) => {
    // "include" in findOne will join,
    // equivalent of SELECT * FROM users LEFT OUTER JOIN blogposts ON users.id = blogposts.user_id WHERE id = ${request.params.id} LIMIT 1;
    db.User.findOne({
      where: { id: request.params.id },
      //TODO: Make sure this works AAS
      include: [db.BlogPost],
    }).then((dbUser) => {
      response.json(dbUser);
    });
  });

  ////////// U - Update - TODO: Does that mean change user information? Profile? Or is this login?
  // Update user password
  app.put(
    "/api/users/:id",
    (request, response) => {
      // if (request.user.id === request.params.id) {
      db.User.update(request.body, {
        where: { id: request.params.id },
      })
        .then((result) => {
          response.json(result);
        })
        .catch((err) => {
          response.json(err);
        });
    }
    // else {
    //   response.redirect("/dashboard");
    // }
  );

  ////////// D - Delete (Destroy) - Delete one or all Users ( TODO: Probably not all?)
  // delete user
  app.delete("/profile/:id", (request, response) => {
    // console.log(request.params);
    db.User.destroy({
      where: { id: request.params.id },
    })
      .then((result) => {
        response.json({ id: result });
      })
      .catch((err) => {
        response.status(401).json(err);
      });
  });

  //logout
  app.get("/logout", (request, response) => {
    request.logout();
    response.redirect("/");
  });

  // route for comments
  app.post("/api/BlogPosts/comment", (request, response) => {
    const newComment = {
      commentBody: request.body.value,
      BlogPostId: request.body.postId,
      UserId: request.user.id,
    };
    db.Comment.create(newComment).then((result) => {
      response.status(201).json(result);
    });
  });

  //userProfile route
  app.get("/dashboard/:id", isAuthenticated, (request, response) => {
    db.User.findOne({
      where: { id: request.params.id },
      include: [{ model: db.BlogPost, include: [db.Like, db.Comment] }],
    })
      .then((result) => {
        const blogPosts = result.dataValues.BlogPosts;

        console.log("#####################result.dataValues", result.dataValues);
        console.log("&&&&&&&&&&&&&&&result.dataValues.Comments[0].dataValues", result.dataValues.BlogPosts[0].dataValues);
        const userInfo = {
          result,
          blogs: blogPosts,
        };
        // console.log("result -----------------------", userInfo);
        response.render("userProfile", userInfo);
      })
      .catch((err) => {
        response.json(err);
      });
  });

  app.get("/findFriends", isAuthenticated, (request, response) => {
    db.User.findAll()
      .then((result) => {
        const loggedInUserId = request.user.id;
        const fileteredUser = result.filter((user) => user.dataValues.id !== loggedInUserId);

        const userInfo = {
          usersInfo: fileteredUser,
        };
        response.render("findFriends", userInfo);
      })
      .catch((err) => {
        response.json(err);
      });
  });
};
