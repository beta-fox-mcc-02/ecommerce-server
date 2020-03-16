'use strict';
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model {
    static associate(models) {
      // Category.belongsToMany(models.Product, {through: models.ProductCategory})
      Category.hasMany(models.Product)
    }
  }
  Category.init({
    tag: DataTypes.STRING
  }, {
    sequelize
  });

  return Category;
};