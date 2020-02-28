'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      // User.hasToMany(models.Product, { through: models.Cart })
      User.hasMany(models.Cart)
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'email sould not be empty'
        },
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'password sould not be empty'
        },
        len: {
          args: [6],
          msg: 'password required minimum length 6'
        }
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"] 
    }
  }, { 
    sequelize,
    hooks: {
      beforeCreate: function(user, option) {
        user.password = hashPassword(user.password)
      }
    }
  })
  
  return User;
};