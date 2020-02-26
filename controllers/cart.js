const { Cart, CartDetail, sequelize, Product } = require('../models')
const { Op } = require('sequelize')

class CartController {

  static updateCart (req, res, next) {
    const cart_id = req.params.id
    const { product_id, quantity } = req.body
    CartDetail.findOne({
      include:[Product],
      where: {
        [Op.and]:[
          {
            cart_id
          },
          {
            product_id
          }
        ]
      }
    })
    .then(cartDetail => {
      if (cartDetail) {
        CartDetail.update({
          quantity: cartDetail.quantity + quantity,
          price: cartDetail.Product.price
        }, {
          where: {
            id: cartDetail.id
          },
          individualHooks: true,
          returning: true
        })
        .then(updated => {
          res.status(200).json(updated)
        })
        .catch(err => {
          next(err)
        })
      } else {
        Product.findOne({
          where: {
            id: product_id
          }
        })
        .then(product => {
          CartDetail.create({
            cart_id,
            product_id,
            quantity,
            price: product.price
          })
          .then(cartDetail => {
            res.status(200).json(cartDetail)
          })
          .catch(err => {
            next(err)
          })
        })
        .catch(err => {
          next(err)
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static createCart (req, res, next) {
    const product_id = req.body.product_id
    const quantity = req.body.quantity ? req.body.quantity : 1
    const user_id = req.decoded
    Product.findOne({
      where: {
        id: product_id
      }
    })
    .then(product => {
      return sequelize.transaction((t) => {
        return Cart.create({
          user_id,
          status: false
        }, { transaction: t} )
        .then(cart => {
          return CartDetail.create({
            cart_id: cart.id,
            product_id,
            quantity,
            price: product.price,
          }, { transaction: t })
        })
      })
    })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController