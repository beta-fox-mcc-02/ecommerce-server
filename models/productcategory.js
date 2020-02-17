'use strict';
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends sequelize.Sequelize.Model {
    static associate (models) {
      ProductCategory.belongsTo(models.Product)
      ProductCategory.belongsTo(models.Category)
    }
  }
   ProductCategory.init({
    ProductId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize
  });
 
  return ProductCategory;
};