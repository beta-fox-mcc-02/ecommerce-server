'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model {
    static associate (models) {
      Cart.belongsTo(models.User, { foreignKey: 'user_id'} )
      Cart.hasMany(models.CartDetail, { foreignKey: 'cart_id' })
    }
  }
  Cart.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, { sequelize })
  return Cart;
};