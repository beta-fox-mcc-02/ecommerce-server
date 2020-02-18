const bcrypt = require('bcryptjs')

class BcryptHelper {
  static hashingPassword(password) {
    const SALT = bcrypt.genSaltSync(+process.env.SALT)
    return bcrypt.hashSync(password, SALT)
  }

  static validatePassword(password, hashed) {
    return bcrypt.compareSync(password, hashed)
  }
}

module.exports = BcryptHelper