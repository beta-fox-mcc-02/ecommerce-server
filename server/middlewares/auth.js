const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = {
  authenticate(req, res, next) {
    const token = verifyToken(req.headers.token)
    if(token.name) 
    next({
      name: "AuthenticationError",
      status: 401,
      message: "Please login first"
    })
    else {
      req.currentUserId = token.id
      next()
    }
  },

  authorize(req, res, next) {
    const { currentUserId } = req
    User.findByPk(currentUserId)
      .then(user => {
        if(!user) 
          next({
            name: "AthorizationError",
            status: 401,
            message: "No access available"
          })
        else {
          if(!user.role) 
          next({
            name: "AthorizationError",
            status: 401,
            message: "No access available"
          })
          else next()
        }
      })
  }
}