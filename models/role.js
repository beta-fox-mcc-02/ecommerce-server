'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Role extends Model {
    static associate(models){

    }
  }

  Role.init({
    position: DataTypes.STRING
  }, 
  {
    sequelize
  })

  return Role;
};