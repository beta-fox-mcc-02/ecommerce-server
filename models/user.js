'use strict'
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model {
        static associate(models) {}
    }

    User.init(
        {
            email: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            password: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            RoleId: DataTypes.INTEGER
        },
        { sequelize }
    )
    return User
}
