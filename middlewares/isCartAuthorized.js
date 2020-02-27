const { Cart } = require('../models')

const isCartAuthorized = (req, res, next) => {
  const user_id = req.decoded
  const id = req.params.id
  Cart.findOne({
    where: {
      id
    }
  })
  .then(cart => {
    if (cart) {
      if (cart.user_id === user_id) {
        next()
      } else {
        next({
          status: 401,
          name:'UNAUTHORIZED',
          message: 'You are not authorized to access this cart'
        })
      }
    } else {
      next({
        status: 404,
        name: 'NOT_FOUND',
        message:'Car with id '+id + ' is not found'
      })
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = isCartAuthorized