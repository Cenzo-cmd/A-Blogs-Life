/* eslint-disable camelcase */
module.exports = function (sequelize, DataTypes) {
  const UserFollows = sequelize.define("UserFollows", {
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return UserFollows;
};
