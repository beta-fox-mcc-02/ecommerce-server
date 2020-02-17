const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword(value){
        const salt = bcrypt.genSaltSync(+process.env.SALT)
        return bcrypt.hashSync(value, salt)
    }
}