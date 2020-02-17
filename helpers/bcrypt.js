const bcrypt = require('bcryptjs')
const salt = +process.env.SALT

module.exports = {
    hashPassword: password => {
        return bcrypt.hashSync(password, salt)
    },
    comparePassword: (input, password) => {
        return bcrypt.compareSync(input, password)
    }
}