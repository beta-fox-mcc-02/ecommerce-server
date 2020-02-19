'use strict';
const { hashingPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {
    static associate(models){

    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "email has already use"
      },
      validate: {
        isEmail: {
          msg : "Input is not email format"
        },
        notEmpty: {
          msg : "You have to register an email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 8],
          msg: "Password length must between 2 and 8"
        },
        notEmpty: {
          msg: "You have to set your password"
        }
      }
    },
    RoleId: DataTypes.INTEGER
  },
  {
    sequelize,
    hooks: {
      beforeCreate: (user, option) =>  {
        let hashedPassword = hashingPassword(user.password)
        user.password = hashedPassword
        return 
      }
    }
  })
  
  return User;
};