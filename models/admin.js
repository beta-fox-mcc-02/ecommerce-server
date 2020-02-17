'use strict';
const BcryptPassword = require('../helpers/encryptpassword.js')

module.exports = (sequelize, DataTypes) => {
  class Admin extends sequelize.Sequelize.Model{}
  Admin.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `input email/password error`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5],
          msg: `input length should be more than 5`
        },
        isAlphanumeric: {
          args: true,
          msg: `password should be alphanumeric`
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: BcryptPassword.hash
    }
  })
  Admin.associate = function(models) {

  };
  return Admin;
};