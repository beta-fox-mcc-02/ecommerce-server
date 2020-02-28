'use strict';
module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  }
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'cart UserId cant be empty'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'cart ProductId cant be empty'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'cart amount cant be empty'
      }
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'cart total cant be empty'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'cart price cant be empty'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { sequelize })
  return Cart;
};