'use strict';
const { hashPassword } = require('../helpers/password')


module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate (models) {
      User.belongsToMany(models.Product, {
        through: models.Cart
      })
    }
  }

  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'wrong format email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8],
          msg: 'minimum password length 8'
        }
      }
    },
    role: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
        if (user.last_name === null || user.last_name === undefined || user.last_name.length === 0) {
          user.last_name = user.first_name
        }
      }
    },
    validate: {
      first_name_not_null() {
        if (this.first_name === null) {
          throw new Error('required first name')
        }
      },
      address_not_null() {
        if (this.address === null) {
          throw new Error ('required address')
        }
      },
      email_not_null() {
        if (this.email === null) {
          throw new Error ('required email')
        }
      },
      password_not_null() {
        if (this.password === null) {
          throw new Error ('required password')
        }
      },
      email_must_unique(next) {
        User.findOne({
          where: {
            email: this.email
          }
        })
          .then(user => {
            if (user) {
              next('email has been declared another user')
            } else {
              next()
            }
          })
          .catch(next)
      }
    }
  })

  return User;
};