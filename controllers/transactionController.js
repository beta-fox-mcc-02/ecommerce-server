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
        model: Transaction,
        include: [Product]
      },
      attributes: ['id', 'username']
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => next(err))
  }

  static payment ({ params, body }, res, next) {
    Transaction.update({
      status: true
    }, {
      where: {
        [Op.and] : [{id: params.id }, {CustomerId: body.customerId}, {ProductId: body.productId}]
      }
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => next(err))
  }

  static cancel ({ params, body }, res, next) {
    Product.findOne({
      where: {
        id: body.productId
      }
    })
      .then((data) => {
        let returnStock = data.stock + (body.purchasePrice / data.price)
        return Product.update({
          stock: returnStock
        }, {
          where: {
            id: data.id
          }
        })
      })
      .then((data) => {
        Transaction.destroy({
          where: {
            id: params.id
          }
        })
      })
      .then((data) => {
        res.status(200).json('cancel success')
      })
      .catch((err) => next(err))
  }
}

module.exports = TransactionController