const { Customer } = require('../models')
const jwt = require('jsonwebtoken')
const BcryptPassword = require('../helpers/encryptpassword.js')

class CustomerController {
  static register ({ body }, res, next) {
    Customer.create({
      username: body.username,
      email: body.email,
      password: body.password
    })
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => next(err))
  }

  static login ({ body }, res, next) {
    Customer.findOne({
      where: {
        email: body.email
      }
    })
      .then((data) => {
        if (data) {
          let isValid = BcryptPassword.compare(body.password, data.password)
          if (isValid) {
            let payload = {
              id: data.id,
              email: data.email
            }
            let token = jwt.sign(payload, 'ucul')
            res.status(200).json({token, username: data.username})
          }
          else next({message: 'input invalid'})
        }
        else next({message: 'user not found'})
      })
  }
}

module.exports = CustomerController