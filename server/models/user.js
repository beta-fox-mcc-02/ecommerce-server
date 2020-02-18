'use strict';
const { hashing } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate(models) {
      //association can be found here
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Wrong email format"
        },
        notNull: {
          msg: "Email cannot be empty"
        },
        isUnique(value, next) {
          User.findAll()
            .then(users => {
              if(!users.length) next()
              else {
                let match = false
                users.forEach(user => {
                  if(user.email == value) match = true 
                });
                if(match)
                  next({
                    status: 400,
                    msg: "Email is already used"
                  }) 
              else next()
              }
            })
            .catch(next)
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      individualHooks: true,
      validate: {
        notNull: {
          msg: "Password cannot be empty"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, opt) => {
        let hashed = hashing(user.password)
        user.password = hashed
      },

      beforeUpdate: (user, opt) => {
        let hashed = hashing(user.password)
        user.password = hashed
      },
    }  
  });

  return User;
};