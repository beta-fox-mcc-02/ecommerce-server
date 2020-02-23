const bcrypt = require('bcryptjs');
const SALT = process.env.SALT
const salt = bcrypt.genSaltSync(+SALT);

module.exports = {
    hashPassword(password){
        return bcrypt.hashSync(password, salt)
    },
    checkPassword(password, password_db){
        return bcrypt.compareSync(password, password_db)
    }
}