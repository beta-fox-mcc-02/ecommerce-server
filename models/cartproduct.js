'use strict';
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends sequelize.Sequelize.Model{}
  CartProduct.init({
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    isCheckout: DataTypes.BOOLEAN,
    invoice: DataTypes.DATE
  }, {
    sequelize
  });
  CartProduct.associate = function(models) {
    // associations can be defined here
    CartProduct.belongsTo(models.Cart)
    CartProduct.belongsTo(models.Product)
  };
  return CartProduct;
};