'use strict';
module.exports = (sequelize, DataTypes) => {
  const {
    Model
  } = require("sequelize")
  const bcrypt = require('../helpers/bcrypt')


  class Admin extends Model {}

  Admin.init({
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
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hash(user.password)
      }
    }
  })

  Admin.associate = function (models) {
    // associations can be defined here
  };
  return Admin;
};