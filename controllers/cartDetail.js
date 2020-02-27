const { Cart, CartDetail, sequelize } = require('../models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize')

class CartDetailController {

  static deleteCartDetail (req, res, next) {
    const id = +req.params.detail_id
    CartDetail.destroy({
      where: {
        id
      }
    })
    .then(result => {
      if (result) {
        res.status(200).json({
          message: 'Delete successfully'
        })
      } else {
        next({
          status: 404,
          name: 'NOT_FOUND',
          message:'Car detail with id '+ id + ' is not found'
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateCartDetail (req, res, next) {
    const cartDetails = req.body.cart_details
    sequelize.transaction((t) => {
      const promises = []
      for (const detail of cartDetails) {
        const promise = CartDetail.update({quantity: +detail.quantity},{
          where: {
            id: detail.id
          }, individualHooks: true, returning: true,
           transaction: t
        })
        promises.push(promise)
      }
      return Promise.all(promises);
   }).then(function (result) {
      res.status(200).json(result)
   }).catch(function (err) {
      next(err);
   });
  }
}

module.exports = CartDetailController