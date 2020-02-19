const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
  generateToken(payload) { //payload is an object
    let id = payload
    return jwt.sign({id}, secret)
  },

  verifyToken(token) {
    try {
      return decoded = jwt.verify(token, secret)
    } catch (err) {
      return err
    }
  }
}