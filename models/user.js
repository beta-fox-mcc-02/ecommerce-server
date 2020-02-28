'use strict';
const { hashing } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate(models) {
      //association can be found here
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be empty"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          msg: "Wrong email format"
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      individualHooks: true,
      validate: {
        notNull: {
          msg: "Password cannot be empty"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, opt) => {
        let hashed = hashing(user.password)
        user.password = hashed
      },

      beforeUpdate: (user, opt) => {
        let hashed = hashing(user.password)
        user.password = hashed
      },
    }  
  });

  return User;
};