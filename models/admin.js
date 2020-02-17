'use strict';
const {hashPassword} =  require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Admin extends sequelize.Sequelize.Model{}
  Admin.init({
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
          sequelize.models.Admin.findOne({
                where : {
                  email : value
                }
              })
              .then(admin => {
                // console.log(admin, 'masuuuuk validate')
                if(admin){
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
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate : (admin, options) =>{
        admin.password = hashPassword(admin.password)
      }
    }
  });
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};