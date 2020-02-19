'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Admin extends Model {
    static associate(models) {

    }
  }

  Admin.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Name is required"
        }
      }
    }, 
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : "email format wrong"
        },
        notEmpty : {
          args : true,
          msg : "Email is required"
        }
      }
    }, 
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Password is required"
        },
        len(value, next) {
          if ( value.length >= 8 ) {
            next()
          } else {
            next('Password minimal 8 character')
          }
        }
      }
    } 
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user, options) => {
        let hash = hashPassword(user.password)
        user.password = hash
      }
    }
  })

  return Admin;
};