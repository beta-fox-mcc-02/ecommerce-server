const bcrypt = require('bcryptjs')

class BcryptPassword{
    static hash(user, options) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
    }
    static compare(inputPass, hashedPass) {
        let isValid = bcrypt.compareSync(inputPass, hashedPass)
        return isValid
    }
}

module.exports = BcryptPassword