'use strict';
const BcryptPassword = require('../helpers/encryptpassword.js')
const { Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Admin extends sequelize.Sequelize.Model{}
  Admin.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `input email/password error`
        },
        isExist(value, next) {
          Admin.findOne({
            where: {
              email: {
                [Op.iLike]: value
              }
            }
          })
          .then((data) => {
            if(data) next({ message: `email exist`})
            else next()
          })
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