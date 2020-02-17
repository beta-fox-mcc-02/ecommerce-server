'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  }
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: `minimum item to put in cart is 1!`
        }
      }
    }
  }, {
    sequelize
  });

  return Cart;
};