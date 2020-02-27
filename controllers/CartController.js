const {
  CartItem,
  ShoppingCart,
  Product,
  sequelize,
  Transaction,
  TransactionDetail
} = require('../models')

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
  }

  static checkout(req, res, next) {
    const ShoppingCartId = +req.params.id

    CartItem.findAll({
      where: { ShoppingCartId },
      include: [Product]
    })
      .then(cartItems => {
        let transactionDetails = []
        let totalPrice = 0
        cartItems.forEach(el => {
          let item = {
            productName: el.Product.name,
            ProductId: el.Product.id,
            price: el.Product.price,
            quantity: el.quantity,
            image_url: el.Product.image_url
          }
          transactionDetails.push(item)
          totalPrice += el.Product.price
        })

        let newProduct = cartItems.map(el => {
          return { id: el.Product.id, stock: el.Product.stock - el.quantity }
        })
        let trans = { UserId: req.jwtPayload.id, totalPrice }

        return sequelize
          .transaction(function(t) {
            return Transaction.create(trans, { transaction: t }).then(function(
              result
            ) {
              const transId = result.id
              transactionDetails.forEach(el => {
                el.TransactionId = transId
              })

              return TransactionDetail.bulkCreate(transactionDetails, {
                transaction: t
              }).then(resCreate => {
                return Product.bulkCreate(newProduct, {
                  updateOnDuplicate: ['stock']
                }).then(newProductresult => {
                  return ShoppingCart.destroy({
                    where: { id: ShoppingCartId },
                    transaction: t
                  }).then(resdel => {
                    return CartItem.destroy({ where: { ShoppingCartId } })
                  })
                })
              })
            })
          })
          .then(endResult => {
            res.status(200).json(endResult)
          })
          .catch(err => {
            console.log(err)
            next(err)
          })
      })
      .catch(next)
  }

  static update(req, res, next) {}

  static delete(req, res, next) {}
}

module.exports = CartController
