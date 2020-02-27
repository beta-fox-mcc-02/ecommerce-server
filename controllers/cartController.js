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

  static editCart (req, res, next) {
    const { id } = req.params
    const { UserId, ProductId, quantity, status } = req.body
    console.log('id=', id)
    console.log('quantity=', quantity)

    Cart.update(
      {
        UserId,
        ProductId,
        quantity,
        status
      },
      {
        where: {
          id: Number(id)
        },
        individualHooks: true,
        returning: true
      }
    )
      .then(response => {
        res.status(200).json({
          msg: 'success update cart',
          data: response
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static delete (req, res, next) {
    const { id } = req.params

    Cart.destroy({
      where: {
        id
      }
    })
      .then(response => {
        res.status(200).json({
          msg: "cart deleted"
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller