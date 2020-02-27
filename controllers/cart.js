const { Cart, CartDetail, sequelize, Product, ProductImage } = require('../models')
const { Op } = require('sequelize')

class CartController {

  static fetchCarts (req, res, next) {
    const user_id = req.decoded
    Cart.findAll({
      include: [{
        model: CartDetail,
        include:[Product]
      }],
      order: [
        ['id', 'DESC']
      ],
      where: {
        [Op.and]:[
          {
            user_id
          },
          {
            status: true
          }
        ]
      }
    })
    .then(carts => {
      res.status(200).json(carts)
    })
    .catch(err => {
      next(err)
    })
  }

  static checkout (req, res, next) {
    const cart_details = req.body.cart_details
    const cart_id = req.body.cart_id
    const product_ids = []
    for (const detail of cart_details) {
      product_ids.push(detail.Product.id)
    }
    Product.findAll({
      where: {
        id: {
          [Op.in]: product_ids
        }
      }
    })
    .then(products => {
      const errorsStock = []
      for (const p of products) {
        const filter = cart_details.filter((c) => c.product_id === p.id)
        if (filter.length) {
          const found = filter[0]
          if (found.quantity > p.stock) {
            errorsStock.push('not enough stock ' + p.name)
          }
        }
      }
      if (errorsStock.length) {
        next({
          name: 'NOT_ENOUGH_STOCK',
          errors: errorsStock
        })
      } else {
        sequelize.transaction((t) => {
          return Cart.update({
            status: true
          }, {
            where: {
              id: cart_id
            },
            returning: true,
            transaction: t
          })
          .then(updated => {
            const promises = []
            for (const detail of cart_details) {
             const promise = Product.findOne({
                where: {
                  id: detail.product_id
                },
                transaction: t
              })
              .then(product => {
                Product.update({
                  stock: product.stock - Number(detail.quantity)
                },{ where: {
                  id: product.id
                }, transaction: t })
              })
              .catch(err => {
                next(err)
              })
              promises.push(promise)
            }
            return Promise.all(promises)
          })
        }).then((result) => {
          res.status(200).json({
            message: 'Your order has been successfully placed'
          })
        }).catch((err) => {
          next(err)
        });
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static findOneCart (req, res, next) {
    const id = +req.params.id
    Cart.findOne({
      include:[{
        model: CartDetail,
        order: [
          ['id', 'ASC']
        ],
        include: [{
          model: Product,
          include: [ProductImage]
        }]
      }],
      where: {
        id
      }
    })
    .then(cart => {
      res.status(200).json(cart)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateProductInCart (req, res, next) {
    const cart_id = req.params.id
    const { product_id, quantity } = req.body

    if (quantity <=0) {
      next({
        status: 400,
        name: 'BAD_REQUEST',
        message: 'Quantity must be greather than zero'
      })
    } else {
      CartDetail.findOne({
        include:[Product],
        where: {
          [Op.and]:[
            {
              cart_id
            },
            {
              product_id
            }
          ]
        }
      })
      .then(cartDetail => {
        if (cartDetail) {
          CartDetail.update({
            quantity: cartDetail.quantity + Number(quantity),
            price: cartDetail.Product.price
          }, {
            where: {
              id: cartDetail.id
            },
            individualHooks: true,
            returning: true
          })
          .then(updated => {
            const isUpdated = updated[0]
            if (isUpdated) {
              const data = updated[1][0]
              res.status(200).json(data)
            } else {
              next({
                status: 404,
                name: 'NOT_FOUND',
                message: 'Product with id '+ product_id + ' is not found'
              })
            }
          })
          .catch(err => {
            next(err)
          })
        } else {
          Product.findOne({
            where: {
              id: product_id
            }
          })
          .then(product => {
            CartDetail.create({
              cart_id,
              product_id,
              quantity,
              price: product.price
            })
            .then(cartDetail => {
              res.status(200).json(cartDetail)
            })
            .catch(err => {
              next(err)
            })
          })
          .catch(err => {
            next(err)
          })
        }
      })
      .catch(err => {
        next(err)
      })
    }
  }

  static createCart (req, res, next) {
    const product_id = req.body.product_id
    const quantity = req.body.quantity ? req.body.quantity : 1
    const user_id = req.decoded

    Cart.findOne({
      where: {
        [Op.and]: [
          {
            user_id
          },
          {
            status: false
          }
        ]
      }
    })
    .then(cart => {
      if (cart) {
        Product.findOne({
          where: {
            id: product_id
          }
        })
        .then(product => {
          CartDetail.create({
            cart_id: cart.id,
            product_id,
            quantity,
            price: product.price,
          })
          .then(cartDetail => {
            res.status(201).json(cartDetail)
          })
          .catch(err =>{
            next(err)
          })
        })
        .catch(err => {
          next(err)
        })
      } else {
        Product.findOne({
          where: {
            id: product_id
          }
        })
        .then(product => {
          return sequelize.transaction((t) => {
            return Cart.create({
              user_id,
              status: false
            }, { transaction: t} )
            .then(cart => {
              return CartDetail.create({
                cart_id: cart.id,
                product_id,
                quantity,
                price: product.price,
              }, { transaction: t })
            })
          })
        })
        .then(result => {
          res.status(201).json(result)
        })
        .catch(err => {
          next(err)
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateAllProductInCart (req, res, next) {
    const cartDetails = req.body.cart_details
    sequelize.transaction((t) => {
      const promises = []
      for (const detail of cartDetails) {
        const promise = CartDetail.update({quantity: +detail.quantity},{
          where: {
            id: detail.id
          }, individualHooks: true, returning: true,
           transaction: t
        })
        promises.push(promise)
      }
      return Promise.all(promises);
   }).then((response) => {
     const result = []
     for (const product of response) {
      result.push(product[1][0])
     }
     console.log('Response ======', result)
     res.status(200).json(result)
   }).catch((err) => {
      next(err);
   });
  }

  static deleteProductInCart (req, res, next) {
    const id = +req.params.detail_id
    CartDetail.destroy({
      where: {
        id
      }
    })
    .then(result => {
      if (result) {
        res.status(200).json({
          message: 'Delete successfully'
        })
      } else {
        next({
          status: 404,
          name: 'NOT_FOUND',
          message:'Car detail with id '+ id + ' is not found'
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController