'use strict';
const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.belongsToMany(models.Product, {
        through: models.Cart
      })
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "required name"
        },
        notEmpty: {
          args: true,
          msg: "required name"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required email'
        },
        notEmpty: {
          args: true,
          msg: "required email"
        },
        isEmail: {
          args: true,
          msg: 'required email format'
        }
      },
      unique: {
        args: true,
        msg: 'email has already existed'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required password'
        },
        notEmpty: {
          args: true,
          msg: "required password"
        },
        len: {
          args: [8],
          msg: 'Minimum password length is 8 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required role'
        },
        isIn: {
          args: [['user', 'admin']],
          msg: 'invalid role'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        let hash = hashPassword(user.password)
        user.password = hash
      }
    }
  })
  
  return User;
};