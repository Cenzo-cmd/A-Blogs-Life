module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define("comment", {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      commentableId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      commentableType: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Comment.associate = (db) => {
      db.User.hasMany(Comment, {
        foreignKey: "commentableId",
        constraints: false,
        scope: {
          commentableType: "User"
        }
      });
      Comment.belongsTo(db.User, { foreignKey: "commentableId", constraints: false });
      db.BlogPost.hasMany(Comment, {
        foreignKey: "commentableId",
        constraints: false,
        scope: {
          commentableType: "BlogPost"
        }
      });
      Comment.belongsTo(db.BlogPost, { foreignKey: "commentableId", constraints: false });
    };
    return Comment;
  };  