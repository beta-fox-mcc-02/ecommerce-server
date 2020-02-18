const { User, Product, Cart, Category } = require('../models')

class ProductController {
   static create(req, res, next) {
      let newProduct = {
         name: req.body.name,
         image_url: req.body.image_url,
         price: req.body.price,
         stock: req.body.stock,
         CategoryId: req.body.CategoryId
      }

      Product.create(newProduct)
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {

            next(err)
         })
   }

   static getAll(req, res, next) {
      Product.findAll()
         .then(data => {
            res.status(200).json({ data })
         })
         .catch(next)
   }

   static update(req, res, next) {
      let productUpdate = {
         name: req.body.name,
         image_url: req.body.image_url,
         price: req.body.price,
         stock: req.body.stock,
         CategoryId: req.body.CategoryId
      }

      Product.update(
         productUpdate,
         {
            where: {
               id: req.params.productId
            },
            returning: true
         })
         .then(data => {
            if (data[0] === 0) {
               throw ({ code: 404, message: `Product not found` })
            }
            else {
               res.status(200).json({ data })
            }
         })
         .catch(next)
   }

   static delete(req, res, next) {
      Product.destroy({
         where: {
            id: req.params.productId
         }
      })
         .then(data => {
            if (data === 0) {
               throw ({ code: 404, message: `Product not found` })
            }
            else {
               res.status(200).json({ msg: `product with ${req.params.productId} deleted` })
            }
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = ProductController