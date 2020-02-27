const jwt = require('jsonwebtoken')

module.exports = {
    generateToken : function(data) {
        let token = jwt.sign(data, process.env.SECRET)

        return token
    },
    verify : function(token) {
        return jwt.verify(token, process.env.SECRET)
    }
}