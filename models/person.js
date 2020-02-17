'use strict';
const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Person extends Model {
    static associate(models) {
      // associations can be defined here
    }
  };
  Person.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email input'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password Should Has More Than 6 Characters'
        }
      }
    },
    user_role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['admin', 'user']],
          msg: 'Invalid User Role Input'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (person, options) => {
        person.password = hashPass(person.password);
      }
    },
    sequelize
  });
  return Person;
};