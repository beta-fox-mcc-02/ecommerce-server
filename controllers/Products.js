const { Product, Category } = require('../models')

class ProductController {
   static findAll(req, res, next) {
      // console.log('masuk siniiiiiiiiiii')
      Product.findAll({
        order: [['id', 'asc']],
        include: [Category]
      })
         .then(products => {
            // console.log(products)
            if(products.length != 0) {
               res.status(200).json({
                  data : products,
                  msg : 'success get all product'
               })
            } else {
              res.status(200).json({
                data: { name: '', genre: '', CategoryId: '', price: '', image_url: '', stock: '' },
                msg: '' 
              })
            }
         })
         .catch(err => {
            // console.log(err)
            next({error : err})
         })
   }

   static findOne(req, res, next) {
     let id = +req.params.id
    Product.findOne({
      where : { id }
    })
      .then(product => {
        // console.log(product, '======================')
        if(product) {
          res.status(200).json({
            data: product,
            msg: 'success get one product'
          })
        } else {
          next({
            error: {
              name : 'not found'
            },
            status: 400,
            msg: 'product not found'
          })  
        }
      })
      .catch(err => {
        // console.log(err)
        next(err)
      })
   }

   static create(req, res, next) {
      // console.log('masuk create')
      let { name, image_url, price, stock, genre, CategoryId } = req.body
      let input = { name, image_url, price, stock, genre, CategoryId }
      // console.log(input)
      Product.create(input, {
         returning : true
      })
         .then(data => {
            // console.log(data, 'create success')
            res.status(201).json({
               data,
               msg : 'success create product'
            })
         })
         .catch(err => {
            // console.log(err, 'create error')
            next(err)
         })
   }

   static update(req, res, next) {
      let id = +req.params.id
      // console.log(id, '==========')
      let { name, image_url, price, stock, genre, CategoryId } = req.body
      let input = { name, image_url, price, stock, genre, CategoryId }
      Product.findOne({ where : { id } })
        .then(product => {
          // console.log(product, '======================')
          if(product) {
            Product.update(input, { where : { id } })
              .then(data => {
                // console.log(data, '=====================2222')
                res.status(200).json({ msg: 'success update product' })
              })
              .catch(next)
          } else {
            next({ error: { name : 'not found' }, status: 400, msg: 'product not found' })  
          }
        })
        .catch(err => {
          next({ error: err, msg: 'bad request' })  
        })
   }

   static delete(req, res, next) {
      let id = +req.params.id
      Product.findOne({ where : { id } })
        .then(product => {
          // console.log(product, '======================')
          if(product) {
            Product.destroy({ where : { id } })
              .then(data => {
                // console.log(data, '=====================2222')
                res.status(200).json({ msg: 'success delete product' })
              })
              .catch(err => {
                next({error: err, msg: 'fail delete product'})  
              })
          } else {
            next({ error: { name : 'not found' }, status: 400, msg: 'product not found' })  
          }
        })
        .catch(err => {
          next({ error: err, msg: 'bad request' })  
        })
   }
}

module.exports = ProductController