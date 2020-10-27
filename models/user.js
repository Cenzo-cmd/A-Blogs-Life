const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unquie: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.prototype.validatePassword = function(password) {
        return bcrypt.compareSync(password, this.password)
    };

    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
}