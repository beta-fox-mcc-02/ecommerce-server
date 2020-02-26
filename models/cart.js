'use strict';
const { sequelize } = require('../models')
const queryInterface = sequelize

module.exports = (sequelize, DataTypes) => {
  class Cart extends sequelize.Sequelize.Model {
    static associate(models) {
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
          msg: 'UserId sould not be empty'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'ProductId sould not be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'price sould not be empty'
        },
        min: {
          args: [0],
          msg: 'price can only higher than or equal by 0'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'quantity sould not be empty'
        },
        min: {
          args: [1],
          msg: 'quantity can only higher than or equal by 1'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'status sould not be empty'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeValidate(cart, options) {
        const { ProductId, quantity } = cart
        console.log('userId', cart.UserId)
        console.log('ProductId=', ProductId)
        console.log('quantity=', quantity)
        return sequelize.models.Product.findOne({
          where: {
            id: ProductId
          }
        })
          .then(response => {
            if (response) {
              console.log('response===============================',response)
              if (response.stock < quantity) {
                return Promise.reject({
                  status: 400,
                  msg: 'product quantity is not enough'
                })
              } else {
                let calPrice = quantity * response.price
                cart.price = calPrice
              }
            } else {
              return Promise.reject({
                status: 404,
                msg: 'product not found'
              })
            }
          })
          .catch(err => {
            return Promise.reject({
              err
            })
          })
      }
    }
  })

  return Cart;
};