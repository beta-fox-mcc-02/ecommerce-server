'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {
    static associate(models) {
      Cart.belongsTo(models.Product)
      Cart.belongsTo(models.User)
    }
  }

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (value, options) => {
        value.quantity = 1
        value.status = false
      }
    }
  })
  
  return Cart;
};