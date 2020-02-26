'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Cart extends Model {
    static associate (models) {
      // associations can be defined here
      Cart.belongsTo(models.Customer)
      Cart.belongsTo(models.Product)
    };
  }

  Cart.init({
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  },
  {
    sequelize
  })

  return Cart;
};