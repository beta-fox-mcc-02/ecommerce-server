const bcrypt = require('bcryptjs')

module.exports = {
  hash : (password)=>{
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
  },
  comparePassword : (password,hash)=>{
    return bcrypt.compareSync(password,hash)
  }
}