'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartDetail = sequelize.define('CartDetail', {
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  CartDetail.associate = function(models) {
    CartDetail.belongsTo(models.Cart)
    CartDetail.belongsTo(models.Product)
  };
  return CartDetail;
};