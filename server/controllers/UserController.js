const { User } = require('../models')
const { Op } = require('sequelize')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static login(req, res, next) {
    let { user, password } = req.body
    User.findOne({
      where: {
        [Op.or]: [
          {username: user},
          {email: user}
        ] 
      }
    })
      .then(user => {
        if(!user) 
          next({
            name: 'LoginError',
            status: 400,
            errors: [{
              messages: "Wrong username / email / password"
            }]
          })
        else {
          if(!compare(password, user.password)) 
            next({
              name: 'LoginError',
              status: 400,
              errors: [{
                messages: "Wrong username / email / password"
              }]
            })
          else {
            let token = generateToken(user.id)
            res.status(200).json({ token, username: user.username })
          }
        }
      })
    .catch(next)
  }

  static register(req, res, next) {
    let { username, email, password, role } = req.body
    User.create({ username, email, password, role })
      .then(() => {
        res.status(201).json({ msg: "Register successful" })
      })
      .catch(next)
  }
}

module.exports = UserController