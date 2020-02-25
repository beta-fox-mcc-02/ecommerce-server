'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Cart extends Model {
    static associate(models) {
    // associations can be defined here
      Cart.hasMany(models.Product);
      Cart.hasMany(models.Person);
    }
  };
  Cart.init({
    PersonId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN
  }, { sequelize })
  return Cart;
};
