'use strict';
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class Customer extends sequelize.Sequelize.Model{}
  Customer.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        isExist (value, next) {
          Customer.findOne({
            where: {
              email: {
                [Op.iLike]: value
              }
            }
          })
            .then((data) => {
              if(data) next('input exist')
              else next()
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isExist (value, next) {
          Customer.findOne({
            where: {
              email: {
                [Op.iLike]: value
              }
            }
          })
            .then((data) => {
              if(data) next('input exist')
              else next()
            })
        },
        isEmail: {
          args: true,
          msg: 'email format unknown'
        },
        len: {
          args:[5],
          msg: 'input is too short'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5],
          msg: 'input is too short'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate (user, options) {
        if (!user.username) {
          let indexAt = user.email.indexOf('@')
          user.username = user.email.substring(0, indexAt)
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    }
  })
  Customer.associate = function(models) {
    Customer.hasMany(models.Transaction)
  };
  return Customer;
};