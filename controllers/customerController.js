const { Customer } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class CustomerController {
  static register(req, res, next) {
    let payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    Customer.create(payload)
      .then(customer => {
        res.status(201).json(customer)
      })
      .catch(next)
  }

  static login(req, res, next) {
    let payload = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(payload)
    Customer.findOne({
      where: {
        email: payload.email
      }
    })
      .then(customer => {
        console.log('MASUK PAK EKO')
        if (customer) {
          let statusLogin = checkPassword(payload.password, customer.password)
          if (statusLogin) {
            let dataCustomer = {
              id: customer.id,
              name: customer.name,
              email: customer.email,
              isAdmin: false
            }
            let token = generateToken(dataCustomer)
            res.status(200).json({
              access_token : token,
              data: dataCustomer
            })
          } else {
            next({
              name: 'Email/password wrong'
            })
          }
        } else {
          next({
            name: 'Email/password wrong'
          })
        }
      })
      .catch(next)
  }
}

module.exports = CustomerController