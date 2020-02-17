'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  Model.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {args: true, msg: 'Username should not be emtpy'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {args: true, msg: 'Email format is invalid'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {args: true, msg: 'Password cannot be empty'}
      }
    },
    roles: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['admin', 'client']],
          msg: 'Roles can only be admin or client'
        }
      },
      notEmpty: {args: true, msg: 'Roles cannot be emtpy'}
    }
  }, {
    sequelize,
    hooks: {

    }
  })
  
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};