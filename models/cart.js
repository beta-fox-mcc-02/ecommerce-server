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
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'UserId cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'User Id cannot empty'
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
        },
        notEmpty: {
          args: true,
          msg: 'Product Id cannot empty'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Quantity Id cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Product Id cannot empty'
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Total Price cannot be null'
        },
        notEmpty: {
          args: true,
          msg: 'Product Id cannot empty'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status cannot empty'
        }
      }
    }
  }, { sequelize });
  return Cart;
};
