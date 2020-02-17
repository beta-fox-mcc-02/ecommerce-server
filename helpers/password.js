const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(+process.env.SALT)

module.exports = {
    hashPassword: (password) => {
        const hash = bcrypt.hashSync(password, salt)
        return hash
    },
    checkPassword: (passworduser, passworddatabse) => {
        let check = bcrypt.compareSync(passworduser, passworddatabse)
        return check
    }
}