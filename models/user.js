'use strict';
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{
    static associate(models){

    }
  }
  User.init ({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'name is required'
        },
        notEmpty: {
          args: true,
          msg: 'name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail:true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [6],
          msg: 'Password minimal 6 characters'
        }
      }
    }
  ,
    admin: DataTypes.BOOLEAN
  }, { 
    sequelize,
    hooks:{
      beforeCreate: (user, options)=>{
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    }
  });
  return User;
};