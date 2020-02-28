const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY

module.exports = {
    generatetoken: (data) => {
        return jwt.sign(data, privateKey)
    },
    verifytoken: (data) => {
        return jwt.verify(data, privateKey)
    }
}