'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')

  class Category extends Model {}

  Category.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Category name cannot be empty'
        }
      },
      allowNull: false
    }
  },{
    sequelize
  })


  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product)
  };
  return Category;
};