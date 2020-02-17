'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = Sequelize.sequelize.Model
  class Role extends Model {

    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'id' })
    }

  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Name is required'
        }
      }
    }
  }, { sequelize })
  return Role;
};