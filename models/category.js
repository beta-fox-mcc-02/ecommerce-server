'use strict';
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model{}
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize
  });
  Category.associate = function(models) {
    Category.belongsToMany(models.Product, {through: models.CategoryProduct})
    // associations can be defined here
  };
  return Category;
};