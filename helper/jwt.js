const jwt = require('jsonwebtoken')
let secret = 'secret'
class Helperjwt {
    static generate(payload){
        let token = jwt.sign({payload},secret)
        return token
    }
    static vertify(token){
        let decode = jwt.verify(token,secret)
        return decode
    }
}

module.exports = Helperjwt