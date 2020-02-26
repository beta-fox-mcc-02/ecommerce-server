'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Cart extends Model {
    static associate (models) {
      
    }
  }

  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize
  })

  return Cart;
};