const jwt = require('jsonwebtoken')
const { User } = require('../models')

const checkAuth = (req, res, next) => {
  let token = req.headers['authorization'] || ''
  if (token.substr(0, 7) === 'Bearer ') {
    token = token.slice(7, token.length).trimLeft()
  }

  let jwtPayload
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_TOKEN)
    User.findOne({ where: { id: jwtPayload.id } })
      .then(result => {
        if (result) {
          req.jwtPayload = jwtPayload
          next()
        } else {
          next({ name: 'unauthorized', error: 'Unauthorized' })
        }
      })
      .catch(next)
  } catch (err) {
    next({ name: 'unauthorized', error: 'Unauthorized' })
  }
}

module.exports = { checkAuth }
