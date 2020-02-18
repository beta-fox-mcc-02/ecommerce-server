const bcrypt = require('bcryptjs')

class BcryptHelper {
   static encryptPass (password) {
      const SALT = bcrypt.genSaltSync(+process.env.SALT)
      return bcrypt.hashSync(password, SALT)
   }

   static decryptPass (inputPass, userPass) {
      return bcrypt.compareSync(inputPass, userPass)
   }
}


module.exports = BcryptHelper