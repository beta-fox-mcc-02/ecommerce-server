'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    UserId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    invoice: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Cart.associate = function(models) {
    Cart.hasMany(models.CartDetail)
    Cart.belongsTo(models.User)
  };
  return Cart;
};