'use strict';
module.exports = (sequelize, DataTypes) => {
  class CategoryProduct extends sequelize.Sequelize.Model {
    static associate(models) {

    }
  }

  CategoryProduct.init({
    CategoryId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  })
  
  return CategoryProduct;
};