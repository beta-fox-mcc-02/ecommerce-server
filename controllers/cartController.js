const { Cart, Product } = require('../models')

class Controller {
  static getAllCart (req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.decoded.id
      },
      order: [['id', 'ASC']],
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
    const { id } = req.decoded
    const { ProductId, quantity } = req.body

    Cart.create({
      UserId: id,
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
    const userId = req.decoded.id

    if (ProductId) {
      Product.findOne({
        where: {
          id: ProductId
        }
      })
        .then(response => {
          if (response) {
            if (response.stock < quantity) {
              res.status(400).json({
                msg: 'product quantity is not enough'
              })
            } else {
              let calPrice = quantity * response.price
              return Cart.update(
                {
                  UserId: userId,
                  ProductId,
                  quantity,
                  status,
                  price: calPrice
                },
                {
                  where: {
                    id: Number(id)
                  },
                  individualHooks: true,
                  returning: true
                }
              )
            }
          } else {
            res.status(404).json({
              status: 404,
              msg: 'product not found'
            })
          }
        })
        .then(response => {
          res.status(200).json({
            msg: 'success update cart',
            data: response
          })
        })
        .catch(err => {
          next(err)
        })
    } else {
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
        console.log(err)
        next(err)
      })
  }
}

module.exports = Controller