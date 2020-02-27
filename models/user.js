'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model{}

  User.init({
    email: {
      type: DataTypes.STRING,
      // isUnique: true,
      unique: true,
      // {
      //   args: false,
      //   msg: 'Email address already in use!'
      // },
      allowNull: false,
      validate: {  
        notEmpty: {
          args:true,
          msg: "Please insert your email"
        },
        isEmail: {
          args: true,
          msg: "Email format error"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args:true,
          msg: "Please insert your password"
        },
        len: {
          args: [6],
          msg: "Password minimum 6 characters required"
        }
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert the role'
        },
        min: {
          args: 1,
          msg: 'Role id minimal 1'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hash(user.password);
      }
    }
  })
  
  User.associate = function(models) {
    User.belongsTo(models.Role);
  };
  return User;
};