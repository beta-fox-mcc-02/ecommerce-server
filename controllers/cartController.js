const { Cart } = require('../models')
const { Product } = require('../models')

class CartController {
  static findAllCart(req, res, next) {
    let UserId = req.decoded.id
    Cart.findAll({ where: { UserId }, include: [Product] })
      .then(carts => {
        let output = carts.map(el => {
          return {
            id: el.id,
            name: el.Product.name,
            ProductId: el.Product.id,
            quantity: el.quantity,
            totalPrice: el.totalPrice,
            image_url: el.Product.image_url,
            status: el.status,
            updatedAt: el.updatedAt
          }
        })
        res.status(200).json(output)
      })
      .catch(err => {
        next(err)
      })
  }

  static addToCart(req, res, next) {
    let UserId = req.decoded.id
    let quantity = 1
    let { ProductId } = req.body
    Product.findOne({ where: { id: ProductId } })
      .then((product) => {
        let totalPrice = product.price * quantity
        return Cart.create({ UserId, ProductId, quantity, totalPrice })
      })
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateCart(req, res, next) {
    let id = +req.params.id
    let { quantity } = req.body
    Cart.findOne({ where: { id }, include: [Product] })
      .then(cart => {
        let totalPrice = quantity * cart.Product.price
        return Cart.update({ quantity, totalPrice }, { where: { id } })
      })
      .then(cart => {
        res.status(200).json({
          status: cart,
          msg: 'success updated cart'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteCart(req, res, next) {
    let id = +req.params.id
    Cart.destroy({ where: { id } })
      .then(result => {
        res.status(200).json({
          status: result,
          msg: 'success delete cart'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static checkOut(req, res, next) {
    let { ProductId, quantity, id } = req.body
    let maxStock
    Product.findOne({ where: { id: +ProductId } })
      .then(product => {
        maxStock = product.stock
        if (product.stock >= quantity) {
          let stock = product.stock - quantity
          return Cart.update({ status: true }, { where: { id } })
            .then(cart => {
              return Product.update({ stock }, { where: { id: ProductId } })
            })
            .then(result => {
              res.status(200).json({ result, msg: 'transaction success' })
            })
        } else {
          next({
            status: 400,
            msg: `not enough stock, stock is only ${maxStock}`
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController 
