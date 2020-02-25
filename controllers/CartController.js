const { CartItem, ShoppingCart, Product } = require('../models')

class CartController {
  static create(req, res, next) {
    const { ProductId, quantity } = req.body
    const id = req.jwtPayload.id

    ShoppingCart.findOne({ where: { UserId: id } })
      .then(result => {
        if (result) {
          const item = {
            ShoppingCartId: result.id,
            ProductId,
            quantity
          }
          CartItem.create(item)
            .then(item => {
              res.status(201).json({ item })
            })
            .catch(next)
        } else {
          const data = {
            UserId: id
          }
          ShoppingCart.create(data)
            .then(cart => {
              const item = {
                ShoppingCartId: cart.id,
                ProductId,
                quantity
              }
              CartItem.create(item)
                .then(item => {
                  res.status(201).json({ item })
                })
                .catch(next)
            })
            .catch(next)
        }
      })
      .catch(next)

    // cek kalo gaada cartnya, dibikin dulu

    // abis itu di create kalo dah ada
  }

  static find(req, res, next) {
    const id = req.jwtPayload.id
    ShoppingCart.findOne({
      where: { UserId: id },
      include: [{ model: CartItem, include: [Product] }]
    })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
    // res.status(200).json(req.jwtPayload)
  }

  static update(req, res, next) {}

  static delete(req, res, next) {}
}

module.exports = CartController
