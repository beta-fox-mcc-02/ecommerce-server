'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Customer extends Model {
    static associate(models) {
      // associations can be defined here
      Customer.hasMany(models.Cart)
      Customer.belongsToMany(models.Product, { through: models.Cart });
    };
  }

  Customer.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Username is required'
        }
      },
      unique: {
          args: true,
          msg: 'Username has already been taken'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "Password's minimal length is 6 characters"
        }
      }
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    },
    sequelize,
    validate: {
      uniqueEmailValidation(next) {
        Customer.findOne({ where: { email: this.email } })
          .then(response => {
            if(response) {
              // emailnya ada
              next('Email address has already been registered')
            }
            else {
              // user bisa daftar
              next()
            }
          })
          .catch(next)
      }
    }
  })

  return Customer;
};