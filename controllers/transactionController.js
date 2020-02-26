const { Transaction, Product, Customer } = require('../models')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')

class TransactionController {
  static checkout ({ body }, res, next) {
    let decoded = jwt.verify(body.token, 'ucul')
    let product
    Product.findOne({
      where: {
        id: body.itemId
      }
    })
      .then((data) => {
        product = data
        let stock = data.stock - body.stock
        return Product.update({
          stock
        }, {
          where: {
            id: data.id
          }
        })
      })
      .then(() => {
        let purchasePrice = product.price * body.stock
        return Transaction.create({
          CustomerId: decoded.id,
          ProductId: product.id,
          purchasePrice,
          status: false
        })
      })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => next(err))
  }
  static fetchById (req, res, next) {
    Customer.findOne({
      where: {
        id: req.currentUserId
      },
      include: {
        model: Product,
        through: [Transaction]
      },
      attributes: ['id', 'username']
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => next(err))
  }

  static payment ({ params, body }, res, next) {
    console.log(params.id, body.productId)
    Transaction.update({
      status: true
    }, {
      where: {
        [Op.and] : [{CustomerId: params.id}, {ProductId: body.productId}]
      }
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => next(err))
  }
}

module.exports = TransactionController