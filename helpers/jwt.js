const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = {
    createToken(id) {
        return jwt.sign({ id }, "SECRET")
    },
    verifyToken(token) {
        return jwt.verify(token, "SECRET")
    }
}