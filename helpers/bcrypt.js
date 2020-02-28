const bcrypt = require('bcryptjs')
module.exports = {
    hashPassword : function(inputPassword) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(inputPassword, salt)
        return hash
    },
    checkPassword : function(inputPassword, hash) {
        console.log('MASUK CHECK PASSWORD')
        return bcrypt.compareSync(inputPassword, hash)
    }
}
