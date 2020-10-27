// const { DataTypes } = require("sequelize/types");

module.exports = function(sequelize, DataTypes) {
    const BlogPost = sequelize.define("BlogPost", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    })
    return BlogPost;
}