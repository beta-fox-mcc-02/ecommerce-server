const jwt = require('jsonwebtoken')

module.exports = {
    createToken : (value) => {
        // console.log(value)
        return jwt.sign(value, process.env.SECRET)
    }
}