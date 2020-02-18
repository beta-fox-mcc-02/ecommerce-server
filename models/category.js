'use strict';
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model{}
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize
  })
  Category.associate = function(models) {
    Category.hasMany(models.Product)
  };
  return Category;
};