const { CartDetail, Cart, Product } = require('../models')
const { Op } = require("sequelize")

class CartDetailController {
  static findAll (req, res, next) {
    // console.log('PPPPPPPPPPPPPPPPPPPPPPPPP')
    CartDetail.findAll({
      include: [
        {
          model: Cart,
          where: { UserId: req.currentUserId, status: false }
        },
        {
          model: Product
        }
      ]
    })
      .then(data => { 
        // data.forEach(el => {
        //   console.log(el)
        // })
        res.status(200).json({
          data
        })
      })
      .catch(err => {
        // console.log(err)
        next({ error: err })
      })
  }

  static addToCart (req, res, next) {
    // console.log(req.body, req.currentUserId)
    Cart.findOne({ 
      where: { UserId: req.currentUserId, status: false },
      include: [{
        model: CartDetail,
        include: [Product]
      }]
    })
      .then(cart => {
        // console.log(cart, '==========masuk then pertama findOne Cart====')
        // console.log(cart.CartDetails, '===INI==')
        if (!cart) {
          const cartPayload = {
            UserId: req.currentUserId,
            status: false,
            invoice: '',
            date: null
          }
          return Cart.create(cartPayload, { returning: true })
        } else { return cart }
      })
      .then(data => {
        // console.log(data, '==== masuk then kedua =====')
        // console.log(data.CartDetails, '==== masuk then kedua, baris dua =====')
        let newCartDetail = {
          CartId: data.id,
          ProductId: req.body.productId,
          qty: req.body.qty
        }
        // console.log('disini kayaknya')
        CartDetail.findOne({
          where: { CartId: data.id, ProductId: req.body.productId }
        })
          .then(cart => {
            if(cart) {
              // console.log(cart, '=CART=')
              if (newCartDetail.qty + cart.qty >= +req.body.stock) {
                newCartDetail.qty = +req.body.stock
              }
              newCartDetail.total = req.body.price * newCartDetail.qty
              CartDetail.update(newCartDetail, { where: { id: cart.id }})
                .then(product => {
                  res.status(200).json({
                    data: cart,
                    msg: 'findOne Notnull'
                  })
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              newCartDetail.total = req.body.price * newCartDetail.qty
              CartDetail.create(newCartDetail)
                .then(product => {
                  // console.log(cart, '=!CART=')
                  res.status(200).json({
                    data: product,
                    msg: 'findOne null'
                  })
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
          .catch(err => {
            console.log(err, 'error catch')
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  static updateCart (req, res, next) {
    // console.log(req.body)
    // console.log(req.params.id)
    const id = req.params.id
    const input = {
      qty: req.body.qty,
      total: req.body.qty * req.body.price
    }
    // console.log(input.total, '===========')
    CartDetail.update(input, {
      where: { id }, returning: true
    })
      .then(data => {
        // console.log(data[1])
        res.status(200).json({
          data: data[1]
        })
      })
      .catch(next)
  }

  static checkOut (req, res, next) {
    let carts
    CartDetail.findAll({
      where: {
        [Op.or] : [{ id: req.body.id}]
      },
      include: [
        {
          model: Cart,
          where: { id: req.body.CartId }
        },
        {
          model: Product
        }
      ]
    })
      .then(data => {
        carts = data
        let promises = []
        data.forEach(cart => {
          // console.log(cart)
          if(cart.Product.stock >= cart.qty) {
            promises.push(Product.update({ stock: cart.Product.stock - cart.qty },
              { where: { id: cart.Product.id }
            }))
          } else {
            next({
              error: { name: '' },
              msg: `stock of ${cart.Product.name} didn't enough`
            })            
          }
        })
        return Promise.all(promises)
      })
      .then(result => {
        // console.log(carts)
        return Cart.update({ status: true }, {
          where: { id: carts[0].CartId }
        })
      })
      .then(cart => {
        res.status(200).json({
          msg: 'success checkout items'
        })
      })
      .catch(err => {
        // console.log(err)
        next({ error: err })
      })
  }

  static delete (req, res, next) {
    let id = +req.params.id
    // console.log('masuk delete', id)
    CartDetail.destroy({ where: { id } })
      .then(data => {
        // console.log(data, '===')
        res.status(200).json({
          msg: 'success delete'
        })
      })
      .catch(err => {
        // console.log('testing delete =======')
        next({error: { name : err }})
      })
  }
}

module.exports = CartDetailController