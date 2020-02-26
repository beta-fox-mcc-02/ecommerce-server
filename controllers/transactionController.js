const { Transaction, Product, Customer } = require('../models')

class TransactionController {
  static checkout ({ body }, res, next) {
    console.log(body)
  }
}

module.exports = TransactionController