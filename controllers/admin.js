const { User, Role } = require('../models')
const { Op } = require('sequelize')
const { BcryptHelper } = require('../helpers')
const jwt = require('jsonwebtoken')

class AdminController {
  static login(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      include: [Role],
      where: {
        [Op.and]: [
          {
            email: input.email
          },
          {
            role_id: 1
          }
        ]
      }
    })
      .then((user) => {
        if (user) {
          const isValid = BcryptHelper.validatePassword(input.password, user.password)
          if (isValid) {
            const token = jwt.sign({
              id: user.id,
              email: user.email,
              username: user.username,
              role: user.Role
            }, process.env.SECRET)
            res.status(200).json({
              token,
              message: 'LOGIN_SUCCESS'
            })
          } else {
            next({
              status: 400,
              name: 'LOGIN_FAILED',
              error: 'Email / password is incorrect'
            })
          }
        } else {
          next({
            status: 400,
            name: 'LOGIN_FAILED',
            error: 'Email / password is incorrect'
          })
        }
      }).catch((err) => {
        next(err)
      });
  }

  static register(req, res, next) {
    const input = {
      first_name: req.body.first_name,
      username: req.body.username,
      password: req.body.password,
      phone_number: req.body.phone_number,
      email: req.body.email,
      role_id: 1
    }
    User.create(input)
    .then(newUser => {
     res.status(201).json({
       id: newUser.id,
       email: newUser.email,
       username: newUser.username,
       message:'USER_CREATED'
     })
    })
    .catch(next)
   }
}

module.exports = AdminController