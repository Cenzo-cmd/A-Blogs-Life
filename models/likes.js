module.exports = function(sequelize, DataTypes) {
    const Like = sequelize.define("Like", {
      value: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });

    Like.associate = (db) => {
        Like.belongsTo(db.BlogPost, { foreignKey: { allowNull: false } });
        Like.belongsTo(db.User, { foreignKey: { allowNull: false } });
    };
    return Like;
};