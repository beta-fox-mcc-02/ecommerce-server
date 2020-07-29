'use strict';
const bcrypt = require('../helper/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{
    static associate(models){
      User.belongsTo(models.Role)
      User.belongsToMany(models.Product , { through: models.Cart })
    }
  }
  User.init({
    username :{
      type : DataTypes.STRING,
    },
    email : {
      type : DataTypes.STRING,
      allowNull : false,
      validate :{
        notNull : {
          args : true,
          msg : 'please Insert Email'
        },
        isEmail : {
          args : true,
          msg : "please inserrt Email Correctly"
        }
      }
    },
    password :{
      type : DataTypes.STRING,
      allowNull:false,
      validate : {
        notNull : {
          args : true,
          msg : 'please insert password'
        },
        len : {
          args : [8],
          msg : 'please input password minimal 8 length'
        }
      }
    },
    RoleId : {
      type : DataTypes.INTEGER
    }
  },{sequelize,
    validate : {
      uniqueItem(next){
        User.findOne({
          where : {
            email : this.email
          }
        })
        .then(data => {
          if(!data){
            next()
          }
          else{
            next({
              msg : 'Email is invalid'
            })
          }
        })
      }
    },
    hooks : {
      beforeCreate (user,option) {
        const generatePass = bcrypt.generate(user.password)
        user.password = generatePass
      }
    }
  })
  return User;
};