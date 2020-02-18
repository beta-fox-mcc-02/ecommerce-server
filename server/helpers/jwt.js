const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  generateToken(payload) { //payload is an object
    return jwt.sign(payload, secret)
  },

  verifyToken(token) {
    try {
      return decoded = jwt.verify(token)
    } catch (err) {
      return err
    }
  }
}