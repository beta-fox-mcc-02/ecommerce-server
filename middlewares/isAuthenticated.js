const jwt = require('jsonwebtoken')
const { User } = require('../models')


const isAuthenticated = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    let token = authorization.split(' ')[1]
    if (token) {
      try {
        let decoded = jwt.verify(token, process.env.SECRET)
        User.findOne({
          where: {
            id: decoded.id
          }
        })
          .then(user => {
            if (user) {
              req.decoded = decoded.id
              next()
            } else {
              next({
                status: 401,
                name: 'UNAUTHORIZED',
                message: 'Please register first'
              })
            }
          })
          .catch(error => {
            next(error)
          })
      } catch (error) {
        next(error)
      }
    } else {
      next({
        status: 400,
        name: 'LOGIN_FAILED',
        error: 'Please login first'
      })
    }
  } else {
    next({
      status: 400,
      name: 'LOGIN_FAILED',
      error: 'Please login first'
    })
  }
}

module.exports = isAuthenticated