'use strict';
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: models.CategoryProduct
      })
    }
  }

  Category.init({
    name: {
      type: DataTypes.STRING
    },
    bg_img: {
      type: DataTypes.STRING
    }
  }, {
    sequelize
  })
  
  return Category;
};