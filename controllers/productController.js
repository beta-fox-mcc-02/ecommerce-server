const { Product, Category } = require('../models')

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
      .findAll({
        include: Category
      })
      .then(data => {
        console.log(data, '===========')
        res.status(200).json({data})
      })
      .catch(next)
  }

  static updateProduct (req, res, next) {
    let { name, imageUrl, price, stock } = req.body
    Product
      .update({
        name,
        imageUrl,
        price,
        stock
      },{
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.status(200).json({
          msg: 'Update product success',
          result
        })
      })
      .catch(next)
  }

  static deleteProduct (req, res, next) {
    Product
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        console.log(result, '=========asd')
        res.status(200).json({
          msg: 'Delete product success',
          result
        })
      })
      .catch(next)
  }
}


module.exports = ProductController
