const { User, Role, Cart } = require('../models')
const { Op } = require('sequelize')
const { BcryptHelper } = require('../helpers')
const jwt = require('jsonwebtoken')

class UserController {
  static login(req, res, next) {
    const input = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      include: [
        {
         model: Role
        },{
          model: Cart,
          where: {
            status: false
          },
          required: false
        }],
      where: {
        [Op.and]: [
          {
            email: input.email
          },
          {
            role_id: 2
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

  static findOne(req, res, next) {
    const id = req.decoded
    User.findOne({
      include: [
      {
        model: Cart,
        where: {
          status: false
        },
        required: false,
      }],
      where: {
        id
      }
    })
    .then(user => {
      res.status(200).json({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        cart: user.Carts,
        phone_number: user.phone_number
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static register(req, res, next) {
   const input = {
     first_name: req.body.first_name,
     last_name: req.body.last_name,
     username: req.body.username,
     password: req.body.password,
     phone_number: req.body.phone_number,
     email: req.body.email,
     role_id: 2
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
   .catch(err => {
     next(err)
   })
  }
}

module.exports = UserController