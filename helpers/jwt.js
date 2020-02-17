const jwt = require('jsonwebtoken');

module.exports = {
  createToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY);
  },

  validateToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  }
}