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
            next('Quantity should be a positive number');
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
            if (product.stock >= cart.quantity) {
              cart.price = product.price * cart.quantity
            } else {
              return Promise.reject({
                status: 400,
                message: 'Stock is not enough'
              })
            }
          } else {
            return Promise.reject({
              status: 400,
              message: 'Product Not Found'
            })
          }
        }).catch(err => {
          return Promise.reject(err)
        })
      },
      beforeBulkUpdate: (cart, options) => {
        if (+cart.attributes.quantity === 0) {
          return sequelize.models.Cart.destroy({
            where: {
              ProductId: cart.attributes.ProductId,
              PersonId: cart.attributes.PersonId,
            }
          })
            .then((response) => {
              return Promise.reject({
                type: 'notError',
                status: 200,
                message: 'Successfully Removed',
              });
            })
            .catch(err => {
              return Promise.reject(err);
            })
        }
      },
      beforeCreate: (cart, options) => {
        return sequelize.models.Cart.findOne({
          where: {
            ProductId: cart.ProductId,
            PersonId: cart.PersonId,
          },
        })
          .then((response) => {
            if (response) {
              return Promise.reject({
                status: 400,
                message: 'This Product is already in Cart',
              })
            }
          })
          .catch(err => {
            return Promise.reject(err);
          })
      }
  },
    sequelize })
  return Cart;
};
