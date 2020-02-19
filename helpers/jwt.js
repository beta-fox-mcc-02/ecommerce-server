const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

module.exports = {
    generateToken(payload) {
        console.log(secret)
        return jwt.sign(payload, secret);
    }
}