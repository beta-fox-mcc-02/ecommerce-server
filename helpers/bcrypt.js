const bcrypt = require('bcryptjs')
const salt = Number(process.env.SALT)

function hashPassword(password) {
    return bcrypt.hashSync(password, salt)
}

function comparePassword(inputPw, hashPw) {
    return bcrypt.compareSync(inputPw, hashPw)
}

module.exports = { hashPassword, comparePassword }