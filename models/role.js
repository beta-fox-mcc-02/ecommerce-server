'use strict'
module.exports = (sequelize, DataTypes) => {
    class Role extends sequelize.Sequelize.Model {
        static associate(models) {
            Role.hasMany(models.User)
        }
    }

    Role.init(
        {
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'role cannot be empty'
                    }
                }
            }
        },
        { sequelize }
    )
    return Role
}
