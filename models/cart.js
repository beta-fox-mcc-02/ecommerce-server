'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model{
    static associate (models){

    }
  }
  Cart.init({
    UserId : DataTypes.INTEGER,
    ProductId : DataTypes.INTEGER
  },{sequelize})
  // const Cart = sequelize.define('Cart', {
  //   UserId: DataTypes.INTEGER,
  //   ProductId: DataTypes.INTEGER
  // }, {});
  // Cart.associate = function(models) {
  //   // associations can be defined here
  // };
  return Cart;
};