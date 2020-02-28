'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    isCheckout: DataTypes.BOOLEAN
  }, {});
  CartProduct.associate = function(models) {
    // associations can be defined here
  };
  return CartProduct;
};