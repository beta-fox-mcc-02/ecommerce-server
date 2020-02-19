const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT));
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },
    comparePassword(inputPassword, hashedPassword) {
        return bcrypt.compareSync(inputPassword, hashedPassword)
    }
}