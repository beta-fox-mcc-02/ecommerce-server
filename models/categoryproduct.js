'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class CategoryProduct extends Model {
    static associate (models) {

    }
  }

  CategoryProduct.init({
    ProductId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize
  })

  return CategoryProduct;
};