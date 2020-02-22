'use strict';
module.exports = (sequelize, DataTypes) => {
  class Role extends sequelize.Sequelize.Model{
    static associate(models){
      Role.belongsTo(models.User)
    }
  }
    
  Role.init({
    role : {
      type : DataTypes.STRING
    }
  },{sequelize})
  // const Role = sequelize.define('Role', {
  //   role: DataTypes.STRING
  // }, {});
  // Role.associate = function(models) {
  //   // associations can be defined here
  // };
  return Role;
};