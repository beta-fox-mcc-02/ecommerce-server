const { Cart, Product } = require('../models')

class Controller {
  static getAllCart (req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.decoded.id
      },
      include: [ Product ]
    })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static createCart (req, res, next) {
    const { UserId, ProductId, quantity } = req.body

    Cart.create({
      UserId,
      ProductId,
      quantity,
      status: false
    })
      .then(response => {
        res.status(202).json({
          msg: 'success create cart',
          response
        })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = Controller