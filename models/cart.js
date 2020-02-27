'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model{
    static associate(models){
      Cart.belongsTo(models.Costumer)
      Cart.belongsTo(models.Product)
    }
  }
  Cart.init({
    CostumerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },
  {
    sequelize
  })

  return Cart;
};