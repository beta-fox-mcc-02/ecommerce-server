"use strict";
module.exports = (sequelize, DataTypes) => {
  const {
    Model
  } = require("sequelize");
  const bcrypt = require('../helpers/bcrypt')

  class User extends Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Must be a valid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3],
          msg: "password must be at least 3 characters"
        }
      }
    },
    role: {
      type: DataTypes.INTEGER,
      validate: {
        isIn: {
          args: [
            [1, 2]
          ],
          msg: "role must be filled with 1 or 2 only"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hash(user.password)
      }
    }
  });

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};