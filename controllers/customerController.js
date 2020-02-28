const { Customer } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { Cart, Product, CartProduct } = require('../models')

class CustomerController {
  static register(req, res, next) {
    let customer
    let payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    Customer.create(payload)
      .then(data => {
        customer = data
        let payload = {
          CustomerId : data.id
        }
        return Cart.create(payload)
      })
      .then(data => {
        res.status(201).json({
          customer : customer,
          cartId : data.id
        })
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

  static getCartCustomer (req, res, next) {
    const id = req.currentCustomerId
    let cartId
    let productsCus
    Customer.findOne({
            where: {
                id
            },
            include: {
                model: Cart,
                where: {
                  CustomerId : id
                }
            }
        })
        .then(customer => {
            cartId = customer.Cart.id
            return CartProduct.findAll({
              where: {
                CartId : cartId
              }
            })
        })
        .then( products => {
            productsCus = products
            return Product.findAll({
              order: [['id']]
            })
        })
        .then( products => {
          let data = []
          for (let i = 0; i < productsCus.length; i++) {
            for (let j = 0; j < products.length; j++) {
              if (productsCus[i].ProductId === products[j].id) {
                let raw = {
                  product : {
                    id: products[j].id,
                    name: products[j].name,
                    image_url: products[j].image_url,
                    price: products[j].price,
                    stock: products[j].stock
                  },
                  qty: productsCus[i].quantity,
                  isCheckout: productsCus[i].isCheckout
                }
                data.push(raw)
              }
            }
          }
          res.status(200).json({
            cartId : cartId,
            products : data
          })
        })
        .catch(next)
  }

  static addNewProductToCart (req, res, next) {
    let productId = req.params.productId
    let cartId = req.body.cartId
    let quantity = req.body.quantity
    let payload = {
      CartId : cartId,
      ProductId : productId,
      quantity : quantity,
      isCheckout : false
    }
    CartProduct.create(payload)
      .then( data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static updateQuantity (req, res, next) {
    let productId = req.params.productId
    let cartId = +req.body.cartId
    let quantity = +req.body.quantity
    let payload = {
      CartId : cartId,
      ProductId : productId,
      quantity : quantity,
      isCheckout : false
    }
    CartProduct.update(payload, {
      where: {
        ProductId: productId
      },
      returning : true
    })
      .then( data => {
        res.status(200).json(data[1][0])
      })
      .catch(next)
  }

  static deleteItem (req, res, next) {
    let productId = req.params.productId
    CartProduct.destroy({
      where : {
        ProductId : productId
      }
    })
      .then( data => {
        res.status(200).json({
          msg: 'Delete Success'
        })
      })
      .catch(next)
  }

  
}

module.exports = CustomerController