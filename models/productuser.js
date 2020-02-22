'use strict';
module.exports = (sequelize, DataTypes) => {
  const {
    Model
  } = require('sequelize')

  class ProductUser extends Model {}

  ProductUser.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize
  })

  ProductUser.associate = function (models) {
    // associations can be defined here
  };
  return ProductUser;
};