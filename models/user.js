'use strict';
const bcrypt = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{
    static associate(models){
      User.hasMany(models.Product)
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING, 
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING, 
      validate : {
        len : {
          args: [6],
          msg : 'minimal length is 6'
        }
      } 
    },
    role: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args: true,
          msg : 'role cannot be null'
        },
        isIn: {
          args : [['user', 'admin']],
          msg: 'role is only for user and admin'
        }  
      } 
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate: (user) =>{
        let hash = bcrypt.hash(user.password)
        user.password = hash
      }
    }
  })

  return User;
};