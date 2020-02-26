'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Customer extends Model {
    static associate(models) {

    }
  }

  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your name'
        }
      }
    }, 
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your email'
        },
        isEmail: {
          args: true,
          msg: 'Format email is wrong'
        }
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your password'
        },
        len: {
          args: [8],
          msg: 'Minimal character 8'
        }
      }
    }
  },{
    sequelize,
    hooks: {
      beforeCreate : (customer, options) => {
        let password = customer.password
        let hash = hashPassword(password)
        customer.password = hash
      }
    }
  })
  
  return Customer;
};