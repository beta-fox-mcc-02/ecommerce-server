const jwt = require('jsonwebtoken')

class JwtHelper {
   static generateToken (payload) {
      return jwt.sign(payload, process.env.SECRET)
   }

   static verifyToken (token) {
      return jwt.verifyToken(token, process.env.SECRET)
   }
}


module.exports = JwtHelper