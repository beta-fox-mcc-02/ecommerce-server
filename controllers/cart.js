const { Cart, CartDetail, sequelize, Product, ProductImage } = require('../models')
const { Op } = require('sequelize')

class CartController {

  static fetchCarts (req, res, next) {
    const user_id = req.decoded
    Cart.findAll({
      include: [{
        model: CartDetail,
        include:[Product]
      }],
      where: {
        [Op.and]:[
          {
            user_id
          },
          {
            status: true
          }
        ]
      }
    })
    .then(carts => {
      res.status(200).json(carts)
    })
    .catch(err => {
      next(err)
    })
  }

  static checkout (req, res, next) {
    const cart_details = req.body.cart_details
    const cart_id = req.body.cart_id
    const product_ids = []
    for (const detail of cart_details) {
      product_ids.push(detail.Product.id)
    }
    Product.findAll({
      where: {
        id: {
          [Op.in]: product_ids
        }
      }
    })
    .then(products => {
      const errorsStock = []
      for (const p of products) {
        const filter = cart_details.filter((c) => c.product_id === p.id)
        if (filter.length) {
          const found = filter[0]
          if (found.quantity > p.stock) {
            errorsStock.push('not enough stock ' + p.name)
          }
        }
      }
      if (errorsStock.length) {
        next({
          name: 'NOT_ENOUGH_STOCK',
          errors: errorsStock
        })
      } else {
        sequelize.transaction((t) => {
          return Cart.update({
            status: true
          }, {
            where: {
              id: cart_id
            },
            returning: true
          }, { transaction: t })
          .then(updated => {
            const promises = []
            for (const detail of cart_details) {
             const promise = Product.findOne({
                where: {
                  id: detail.product_id
                }
              }, { transaction: t })
              .then(product => {
                Product.update({
                  stock: product.stock - detail.quantity
                },{ where: {
                  id: product.id
                }}, { transaction: t })
              })
              .catch(err => {
                next(err)
              })
              promises.push(promise)
            }
            return Promise.all(promises)
          })
        }).then((result) => {
          res.status(200).json(result)
          // Transaction has been committed
          // result is whatever the result of the promise chain returned to the transaction callback
        }).catch((err) => {
          next(err)
        });
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static findOneCart (req, res, next) {
    const id = +req.params.id
    Cart.findOne({
      include:[{
        model: CartDetail,
        order: [
          ['id', 'ASC']
        ],
        include: [{
          model: Product,
          include: [ProductImage]
        }]
      }],
      where: {
        id
      }
    })
    .then(cart => {
      res.status(200).json(cart)
    })
    .catch(err => {
      next(err)
    })
  }

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