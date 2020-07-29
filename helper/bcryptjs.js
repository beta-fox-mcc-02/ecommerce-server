const bcrypt = require('bcryptjs')
let salt = 10
class Helperbcrypt{
    static generate (password){
        let generatePass = bcrypt.hashSync(password,salt)
        return generatePass
    }
    static compare (password,hash){
        let comparePass = bcrypt.compareSync(password,hash)
        return comparePass
    }
}

module.exports = Helperbcrypt