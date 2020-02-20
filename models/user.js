'use strict';
const { BcryptHelper } = require('../helpers/index')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate(models) {

    }  
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'name cant be empty'
        },
        notNull : {
          args : true,
          msg : 'name cant be null'
        },
        isAlpha : {
          args : true,
          msg : 'name must contain character only'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail: {
          args: true,
          msg: 'please use email format'
        },
        notEmpty : {
          args: true,
          msg: 'email cant be empty'
        },
        notNull : {
          args : true,
          msg: 'email cant be null'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        len : {
          args : [6, 12],
          msg : "password length must be between 6 and 12"
        },
        isAlphanumeric : {
          args : true,
          msg : "password must only contain alpha and numeric"
        },
        notNull : {
          args : true,
          msg : "password cant be null"
        },
        notEmpty : {
          args : true,
          msg : "password cant be empty"
        }
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isInt : {
          args : true,
          msg : 'role must only contain number'
        },
        notNull : {
          args : true,
          msg : 'role cant be null'
        },
        notEmpty : {
          args : true,
          msg : 'role cant be empty'
        }
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate (user, option) {
        user.password = BcryptHelper.encryptPass(user.password)
      }
    }
  })

  return User;
};