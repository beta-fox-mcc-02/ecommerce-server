'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = require('sequelize')

  class Cart extends Model {

  }

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'UserId cannot be null'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'ProductId cannot be null'
        }
      }
    },
    total_price: {
      type: DataTypes.FLOAT
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.BOOLEAN
    } 
  }, {
    sequelize
  })

  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  };
  return Cart;
};