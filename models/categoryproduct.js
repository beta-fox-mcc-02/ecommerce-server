'use strict';
module.exports = (sequelize, DataTypes) => {
  class CategoryProduct extends sequelize.Sequelize.Model{}
  CategoryProduct.init({
    ProductId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize
  });
  CategoryProduct.associate = function(models) {
    // associations can be defined here
  };
  return CategoryProduct;
};