const jwt = require('jsonwebtoken')
const privateKey = process.env.SECRET

function generateToken(payload) {
    return jwt.sign(payload, privateKey)
}

function verifyToken(token) {
    return jwt.verify(token, privateKey)
}

module.exports = { generateToken, verifyToken }