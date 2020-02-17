'use strict';

const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {

    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `name must be filled`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `email must be filled`
        },
        isEmail: {
          args: true,
          msg: `email must be according to email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `name must be filled`
        },
        len: {
          args: [5],
          msg: `password require 5 characters minimum`
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: user => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
      }
    }
  });

  return User;
};