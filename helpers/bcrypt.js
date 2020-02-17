const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(+process.env.SALT);
    return bcrypt.hashSync(password, salt);
  },

  validatePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}