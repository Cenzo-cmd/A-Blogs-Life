module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        commentBody: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    Comment.associate = (db) => {
        Comment.belongsTo(db.BlogPost, { foreignKey: { allowNull: false } });
        Comment.belongsTo(db.User, { foreignKey: { allowNull: false } });
    };

    return Comment;
};