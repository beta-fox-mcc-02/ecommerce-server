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
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `name must be filled`
        },
        notNull: {
          args: true,
          msg: `name cannot be null`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `email must be filled`
        },
        isEmail: {
          args: true,
          msg: `email must be according to email format`
        },
        notNull: {
          args: true,
          msg: `email cannot be null`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `name must be filled`
        },
        len: {
          args: [5],
          msg: `password require 5 characters minimum`
        },
        notNull: {
          args: true,
          msg: `password cannot be null`
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