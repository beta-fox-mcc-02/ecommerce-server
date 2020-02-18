'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    url: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {});
  ProductImage.associate = function(models) {
    // associations can be defined here
  };
  return ProductImage;
};