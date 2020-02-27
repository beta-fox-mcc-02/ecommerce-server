'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class CartDetail extends Model {
    static associate (models) {
      CartDetail.belongsTo(models.Cart, { foreignKey: 'cart_id' })
      CartDetail.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
  }

  CartDetail.init({
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Quantity is required'
        },
        notEmpty: {
          args: true,
          msg: 'Quantity is required'
        },
        isNumeric: {
          args: true,
          msg: 'Only accept number'
        },
        isInt: {
          args: true,
          msg: 'Only accept integer number'
        },
        isGreatherThanZero (value) {
          if (value <=0) {
            throw new Error('Quantity must be greather than zero')
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        isNumeric: {
          args: true,
          msg: 'Only accept number'
        },
        isInt: {
          args: true,
          msg: 'Only accept integer number'
        },
        isGreatherThanZero (value) {
          if (value <=0) {
            throw new Error('Price must be greather than zero')
          }
        }
      }
    },
    total: DataTypes.INTEGER
  }, {
        sequelize,
        hooks: {
          beforeCreate(cartDetail, options) {
            cartDetail.total = cartDetail.price * cartDetail.quantity
          },
          beforeUpdate (cartDetail, options) {
            cartDetail.total = cartDetail.price * cartDetail.quantity
          }
        }
     })
    return CartDetail;
};