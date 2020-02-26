'use strict';
module.exports = (sequelize, DataTypes) => {

  class Cart extends sequelize.Sequelize.Model {
    static associate(models) {
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.User);
    }
  }

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'User Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid User Id' }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Product Id Cannot Null' },
        isInt: { args: true, msg: 'Invalid Product Id' }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Status Cannot Null' },
        notEmpty: { args: true, msg: 'Status Cannot Empty' }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Quantity Cannot Null' },
        isInt: { args: true, msg: 'Invalid Quantity' },
        min: { args: '0', msg: 'Quantity Cannot Negative' }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Price Cannot Null' },
        isFloat: { args: true, msg: 'Invalid Price' },
        min: { args: '0', msg: 'Price Cannot Negative' }
      }
    }
  }, { sequelize });

  return Cart;
};