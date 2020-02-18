const { Product } = require('../models')

class ProductController {
  static addProduct (req, res, next) {
    let data = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      stock: req.body.stock
    }
    Product
      .create(data)
      .then(data => {
        res.status(201).json({
          msg: 'Create Product Success',
          data
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static getProduct (req, res, next) {
    Product
      .findAll()
      .then(data => {
        res.status(200).json({data})
      })
      .catch(next)
  }
}


module.exports = ProductController
