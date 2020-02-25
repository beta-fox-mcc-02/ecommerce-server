'use strict';
const { Product } = require('./index')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Cart extends Model {
    static associate(models) {
    // associations can be defined here
    }
  };
  Cart.init({
    PersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isValid(value, next) {
          if (!value) {
            next('PersonId is Required');
          } else {
            next();
          }
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isValid(value, next) {
          if (!value) {
            next('ProductId is Required');
          } else {
            next();
          }
        }
      }
    },
    price: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isValid(value, next) {
          if (value < 0) {
            next('Quantity should be positive numbers');
          } else {
            next();
          }
        }
      }
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    hooks: {
      beforeValidate: (cart, options) => {
        return sequelize.models.Product.findOne({
          where: {
            id: cart.ProductId
          }
        }).then(product => {
          if (product) {
            if (product.stock) {
              cart.price = product.price * cart.quantity
            } else {
              return Promise.reject({
                status: 400,
                message: 'Product Stock is Empty'
              })
            }
          } else {
            return Promise.reject({
              status: 400,
              message: 'Product Not Found'
            })
          }
        }).catch(err => {
          console.log(err)
          return Promise.reject(err)
        })
      }
  },
    sequelize })
  return Cart;
};
