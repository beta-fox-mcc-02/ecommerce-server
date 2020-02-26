let { Cart } = require('../models')

module.exports = (req, res, next) => {
  let id = +req.params.id
  Cart.findOne({ where: { id } })
    .then(cart => {
      if (cart.UserId == +req.decoded.id) {
        next()
      } else {
        next({
          status: 401,
          msg: 'You are not authorized'
        })
      }
    })
    .catch(err => {
      next(err)
    })

}
