const { Product, Cart } = require('../models')

class CartController {
   // static create(req, res, next) {
   //    let newQuantity
   //    let stock

   //    Cart.findOne({
   //       where: {
   //          UserId: req.currentUserId,
   //          ProductId: req.body.ProductId
   //       },
   //       include: ['Product']
   //    })
   //       .then(data => {
   //          if (!data) {
   //             Product.findOne({
   //                where: {
   //                   id: req.body.ProductId
   //                }
   //             })
   //                .then(product => {
   //                   stock = Number(product.stock)
   //                })
   //                .catch(next)

   //             if (stock >= req.body.quantity) {
   //                let newCart = {
   //                   UserId: req.currentUserId,
   //                   ProductId: req.body.ProductId,
   //                   quantity: req.body.quantity
   //                }
   //                Cart.create(newCart)
   //                   .then(cart => {
   //                      res.status(201).json(cart)
   //                   })
   //                   .catch(next)
   //             }
   //             else {
   //                throw ({ code: 400, message: `stock is not available` })
   //             }
   //          }
   //          else {
   //             console.log(`MASUK UDAH ADA`);

   //             if (data.status) {
   //                console.log(`MASUK UDAH ADA DAN STATUS TRUE`);

   //                if (stock >= req.body.quantity) {
   //                   let newCart = {
   //                      UserId: req.currentUserId,
   //                      ProductId: req.body.ProductId,
   //                      quantity: req.body.quantity
   //                   }
   //                   Cart.create(newCart)
   //                      .then(cart => {
   //                         res.status(201).json(cart)
   //                      })
   //                      .catch(next)
   //                }
   //                else {
   //                   throw ({ code: 400, message: `stock is not available` })
   //                }
   //             }
   //             else {
   //                console.log(`MASUK UDAH ADA DAN STATUS FALSE`);

   //                newQuantity = data.quantity
   //                newQuantity += Number(req.body.quantity)

   //                Product.findOne({
   //                   where: {
   //                      id: req.body.ProductId
   //                   }
   //                })
   //                   .then(product => {
   //                      console.log(product.stock, `ini lhooooooooooooooo`);                        
   //                      stock = product.stock
   //                   })
   //                   .catch(next)

   //                console.log(stock, `INI STOCKKKKKKKKKKK`);


   //                if (stock >= newQuantity) {
   //                   console.log(`MASUK UPDATE CART QUANTITYYYYYYYYYYY`);

   //                   Cart.update({
   //                      quantity: newQuantity
   //                   },
   //                   {
   //                      where: {
   //                         UserId: req.currentUserId,
   //                         ProductId: req.body.ProductId
   //                      },
   //                      returning: true
   //                   })
   //                      .then(updateCart => {
   //                         res.status(200).json(updateCart)
   //                      })
   //                      .catch(next)
   //                }
   //                else {
   //                   throw ({ code: 400, message: `stock is not available` })
   //                }
   //             }
   //          }
   //       })
   //       .catch(next)
   // }

   static create(req, res, next) {
      let newQuantity
      let stock

      Product.findOne({
         where: {
            id: req.body.ProductId
         }
      })
         .then(product => {
            stock = product.stock

            return Cart.findOne({
               where: {
                  UserId: req.currentUserId,
                  ProductId: req.body.ProductId,
                  status: false
               }
            })
         })
         .then(cart => {
            if (cart) {
               newQuantity = Number(cart.quantity) + Number(req.body.quantity)
               if (stock >= newQuantity) {
                  return Cart.update({
                     quantity: newQuantity
                  },
                     {
                        where: {
                           UserId: req.currentUserId,
                           ProductId: req.body.ProductId,
                           status: false
                        },
                        returning: true
                     })
               }
               else {
                  throw ({ code: 400, message: `stock is not available` })
               }
            }
            else {
               if (stock >= req.body.quantity) {
                  let newCart = {
                     UserId: req.currentUserId,
                     ProductId: req.body.ProductId,
                     quantity: req.body.quantity
                  }
                  return Cart.create(newCart)
               }
               else {
                  throw ({ code: 400, message: `stock is not available` })
               }
            }
         })
         .then(data => {
            res.status(201).json(data)
         })
         .catch(next)
   }

   static getAllCart(req, res, next) {
      Cart.findAll({
         where: {
            UserId: req.currentUserId,
            status: false
         },
         include: ['Product']
      })
         .then(data => {
            res.status(200).json(data)
         })
         .catch(next)
   }
}
module.exports = CartController