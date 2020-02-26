'use strict';
const {hashPassword} =  require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Costumer extends sequelize.Sequelize.Model{}
  Costumer.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'email cannot empty'
        },
        isEmail : {
          args : true,
          msg : 'format email is wrong'
        },
        isUnique : (value, next) => {
          // console.log(value)
          sequelize.models.Costumer.findOne({
                where : {
                  email : value
                }
              })
              .then(costumer => {
                // console.log(costumer, 'masuuuuk validate')
                if(costumer){
                  next('email is already used')
                }
                else{
                  next()
                }
              })
              .catch(next)
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'password cannot empty'
        },
        len : {
          args : [5],
          msg : 'password must more than 5 characters'
        }
      }
    },
    balance: {
      type : DataTypes.INTEGER,
      validate : {
        isPositive : (value, next) =>{
          if (value >= 0) next()
          else next('stock must positive number')
        }
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate : (costumer, options) =>{
        costumer.password = hashPassword(costumer.password)
      }
    }
  });
  Costumer.associate = function(models) {
    // associations can be defined here
    Costumer.hasOne(models.Cart)
  };
  return Costumer;
};