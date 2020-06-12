'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')
  const bcrypt = require('../helpers/bcrypt.js')

  class User extends Model {

  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'must be a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3],
          msg: 'Password must be at least 3 characters'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: 'must be filled with numbers'
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

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cart)
  };
  return User;
};