'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    ProductId: DataTypes.INTEGER,
    ShoppingCartId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  CartItem.associate = function(models) {
    // associations can be defined here
    CartItem.belongsTo(models.ShoppingCart)
    CartItem.belongsTo(models.Product)
  };
  return CartItem;
};