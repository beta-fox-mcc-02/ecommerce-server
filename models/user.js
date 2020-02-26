'use strict';
const bcrypt = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {}

  User.init({
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
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (users, option) => {
        users.password = bcrypt.hashSync(users.password);
      }
    }
  })
  
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Product, {
      through: models.Transaction,
      foreignKey: 'UserId'
    })
  };
  return User;
};