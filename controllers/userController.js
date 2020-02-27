const { User } = require('../models')
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    const { email, password, role } = req.body
    User.create({ email, password, role })
      .then(user => {
        let payload = {
          id: user.id
        }
        let access_token = jwt.generateToken(payload)
        res.status(201).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          const verified = bcrypt.comparePassword(password, user.password)
          if (verified) {
            let payload = {
              id: user.id
            }
            let access_token = jwt.generateToken(payload)
            res.status(200).json({ access_token })
          } else {
            next({
              status: 400,
              msg: 'invalid email/password'
            })
          }
        } else {
          next({
            status: 400,
            msg: 'invalid email/password'
          })
        }
      })
  }
}

module.exports = UserController
