const jwt = require('jsonwebtoken')
const PRIVATKEY = "kittenpaws"


module.exports = {
    generateToken: (data) => {
        return jwt.sign(data, PRIVATKEY)
    }, 
    verifyToken: (token) => {
        return jwt.verify(token, PRIVATKEY)
    }
}