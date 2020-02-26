const { CartDetail, Cart, Product } = require('../models')

class CartDetailController {
  static findAll (req, res, next) {
    // console.log('PPPPPPPPPPPPPPPPPPPPPPPPP')
    CartDetail.findAll({
      include: [
        {
          model: Cart,
          where: { UserId: req.currentUserId }
        },
        {
          model: Product
        }
      ]
    })
      .then(data => {
        // console.log(data)
        res.status(200).json({
          data
        })
      })
      .catch(err => {
        console.log(err)
        next({ error: err })
      })
  }

  static addToCart (req, res, next) {
    console.log(req.body, req.currentUserId)
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
        console.log(data, '==== masuk then kedua =====')
        console.log(data.CartDetails, '==== masuk then kedua, baris dua =====')
        let newCartDetail = {
          CartId: data.id,
          ProductId: req.body.productId,
          qty: req.body.qty
        }
        console.log('disini kayaknya')
        CartDetail.findOne({
          where: { CartId: data.id, ProductId: req.body.productId }
        })
          .then(cart => {
            if(cart) {
              console.log(cart, '=CART=')
              newCartDetail.qty += cart.qty
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

  static delete (req, res, next) {
    // let id = +req.params.id
    // CartDetail.destroy({ where: id })
    //   .then(data => {
    //     res.status(200).json({
    //       msg: 'success delete'
    //     })
    //   })
    //   .catch(err => {
    //     next({error: err})
    //   })
  }
}

module.exports = CartDetailController