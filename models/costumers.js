'use strict';
const { hashingPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Costumer extends Model {
    static associate(models){
      Costumer.belongsToMany(models.Product, {
        through: models.Cart
      })
    }
  }
  Costumer.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'You have to register an email'
        },
        isEmail: {
          msg: 'Input is not email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'You have to set your password'
        },
        len: {
          args: [2,8],
          msg: 'Password length must between 2 and 8'
        }
      }
    },
    balance: DataTypes.STRING
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

  return Costumer;
};