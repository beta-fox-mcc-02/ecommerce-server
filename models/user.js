'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Cart)
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1],
          msg: 'username cant be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1],
          msg: 'email cant be empty'
        },
        isEmail: {
          args: true,
          msg: 'your email must contain email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'password cant be empty'
        },
        len: {
          args: [5],
          msg: 'password length cannot less than 5'
        }
      }
    },
    role: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    validate: {
      checkEmail(next) {
        User.findOne({ where: { email: this.email } })
          .then(data => {
            if (data) {
              next('email already in use')
            } else {
              next()
            }
          })
          .catch(next)
      }
    },
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  })

  return User;
};