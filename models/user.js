const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.associate = (db) => {
    User.hasMany(db.BlogPost, { onDelete: "cascade" });
    User.hasMany(db.Comment, { onDelete: "cascade" });
    User.hasMany(db.Like, { onDelete: "cascade" });

    User.belongsToMany(User, { as: "follower", through: db.UserFollows, foreignKey: "following_id" });
    User.belongsToMany(User, { as: "following", through: db.UserFollows, foreignKey: "follower_id" });
  };

  return User;
};
