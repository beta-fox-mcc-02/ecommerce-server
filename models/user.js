'use strict'
const { hashPassword } = require('../helpers/auth')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.belongsTo(models.Role)
      User.hasOne(models.ShoppingCart)
      User.hasMany(models.Transaction)
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Email cannot be empty'
          },
          isEmail: {
            args: true,
            msg: 'Email format not correct'
          },
          isUniqueCustom(value, next) {
            User.findOne({ where: { email: value } })
              .then(result => {
                if (result) {
                  next({ name: 'UserExist' })
                } else {
                  next()
                }
              })
              .catch(err => {
                next(err)
              })
          }
        }
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'first_name cannot be empty'
          }
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'first_name cannot be empty'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'password cannot be empty'
          }
        }
      },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'RoleId cannot be empty'
          }
        }
      }
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password)
        }
      }
    }
  )
  return User
}
