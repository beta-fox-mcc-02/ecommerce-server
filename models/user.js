'use strict';
const { BcryptHelper } = require('../helpers')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'role_id' })
      User.hasMany(models.Cart, { foreignKey: 'user_id' })
    }
  }

  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'First name is required'
        },
        notEmpty: {
          args: true,
          msg: 'First name is required'
        }
      }
    },
    last_name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Username is required'
        },
        notEmpty: {
          args: true,
          msg: 'Username is required'
        },
        len: {
          args: [6],
          msg: 'Username has minimal 6 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [8],
          msg: 'Password has minimum 8 characters'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Password only contains alphabeth and numbers'
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        isValidPhoneNumber(value) {
          if (value) {
            const pattern = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g
            if (!pattern.test(value)) {
              throw new Error('Invalid phone number')
            }
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role id is required'
        },
        notEmpty: {
          args: true,
          msg: 'Role id is required'
        },
        isInt: {
          args: true,
          msg: 'Role id has to be an integer'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user, options) {
        const last_name = user.last_name
        if (!last_name) {
          user.last_name = user.first_name
        }
        user.password = BcryptHelper.hashingPassword(user.password)
      },
    }
  })
  return User;
};