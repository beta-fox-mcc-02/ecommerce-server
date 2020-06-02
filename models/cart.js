'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model{}
  Cart.init({
    CostumerId: DataTypes.INTEGER
  }, {
    sequelize
  });
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Costumer)
    Cart.belongsToMany(models.Product, {through: models.CartProduct})
    Cart.hasMany(models.History)
  };
  return Cart;
};