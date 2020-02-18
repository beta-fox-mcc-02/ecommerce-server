'use strict';
module.exports = (sequelize, DataTypes) => {
  class Admin extends sequelize.Sequelize.Model {
    static associate(models) {

    }
  }
  Admin.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.BOOLEAN
  }, { sequelize })
  return Admin;
};