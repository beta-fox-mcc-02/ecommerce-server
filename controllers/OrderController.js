const { Transaction, TransactionDetail } = require('../models')

class OrderController {
  static find(req, res, next) {
    const id = req.jwtPayload.id
    Transaction.findAll({
      where: { UserId: id },
      include: [{ model: TransactionDetail }]
    })
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }
  static findById(req, res, next) {
    const id = +req.params.id

    TransactionDetail.findAll({ where: { TransactionId: id } })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = OrderController
