const { verifyToken } = require('../helpers/jwt')
const { Product } = require('../models')

module.exports = {
  authenticate(req, res, next) {
    const token = verifyToken(req.headers.token)
    if(!token.id) next(token)
    else {
      req.currentUserId = token.id
      next()
    }
  }

  // authorize(req, res, next) {
  //   const { currentUserId } = req
  //   const productId = +req.params.productId
  //   Product.findByPk(productId)
  //     .then(product => {
  //       if(!product) 
  //         next({
  //           name: "AthorizationError",
  //           status: 401,
  //           msg: "No access available"
  //         })
  //       else {

  //       }
  //     })
  // }
}