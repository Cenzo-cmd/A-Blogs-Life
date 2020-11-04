/* eslint-disable camelcase */
module.exports = function (sequelize, DataTypes) {

    const UserFollows = sequelize.define("UserFollows", {
        // eslint-disable-next-line camelcase
        following_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // eslint-disable-next-line camelcase
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });   
    return UserFollows;
};

