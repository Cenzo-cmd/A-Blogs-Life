// const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = (app) => {
  // main route
  app.get("/", (request, response) => {
    // if (request.user) {
    //     response.redirect("/members");
    // }
    response.render("index");
    // response.sendFile(path.join(__dirname + "../views/index"))
  });

  app.get("/signup", (request, response) => {
    response.render("signup");
  });

  app.get("/dashboard", isAuthenticated, (request, response) => {
    // console.log(request.user.id);
    // console.log("00000000000", request.user);

    db.User.findOne({
      where: { id: request.user.id },
      include: [
        {
          model: db.BlogPost, 
          include: [db.User, db.Like, db.Comment] 
        },
        {
          model: db.User,
          as: "following",
          include: [{ model: db.BlogPost, include: [db.User, db.Like, db.Comment]
        },
        {
          model: db.User,
          as: "follower",
          include: [{ model: db.BlogPost, include: [db.User, db.Like, db.Comment]
        },
      ],
    }).then((result) => {
      const blogPosts = result.dataValues.BlogPosts;
      const following = result.following;
      // const followingPosts = following.BlogPosts;
      
      // console.log("$$$$$$$$$$$$$$", blogPosts);
      // console.log("$$$$$$$$$$$$$$FOLLOWING", following);
      // console.log("/////////////////////OTHERSPOSTS", followingPosts);
      // console.log("$$$$$$$$$$$$$$$$$$$$RESULT", result);

      const userInfo = {
        result,
        blogs: blogPosts,
        following
      };
      //   console.log("&&&&&&", userInfo);
      response.render("dashboard", userInfo);
    });
  });

  app.get("/dashboard/newPost", isAuthenticated, (request, response) => {
    response.render("newPost", request.user);
  });

  app.get("/dashboard/updateProfile", isAuthenticated, (request, response) => {
    response.render("updateProfile", request.user);
  });

  app.get("/feed", isAuthenticated, (request, response) => {
    db.BlogPost.findAll({
      include: [db.User, db.Like, db.Comment]
    }).then((result) => {
      const post = result;
      const data = { post };

      response.render("feed", data);
    });
    
  });
};
