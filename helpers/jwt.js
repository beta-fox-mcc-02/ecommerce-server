const jwt = require('jsonwebtoken')

module.exports = {
    generateToken : function(data) {
        console.log('MASUK JWT TOKEN')
        console.log(process.env.SECRET)
        let token = jwt.sign(data, process.env.SECRET)
        console.log(token)
        return token
    },
    verify : function(token) {
        return jwt.verify(token, process.env.SECRET)
    }
}