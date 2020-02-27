'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model{
    static associate (models){
      Cart.belongsTo(models.Product)
      Cart.belongsTo(models.User)
    }
  }
  Cart.init({
    UserId : DataTypes.INTEGER,
    ProductId : DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },{sequelize})
  return Cart;
};