'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Role extends Model{}

  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert the role'
        },
        len: {
          args: [3],
          msg: 'Role name minimal 3 characters'
        }
      }
    }
  }, {
    sequelize
  })

  Role.associate = function(models) {
    Role.hasMany(models.User);
  };
  return Role;
};