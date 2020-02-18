const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    hashPassword(password){
        return bcrypt.hashSync(password, salt)
    },
    checkPassword(password, password_db){
        return bcrypt.compareSync(password, password_db)
    }
}