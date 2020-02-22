const { Product, Category } = require('../models')

class ProductController {
  static addProduct (req, res, next) {
    console.log(req.body, '[][][][][][][]')
    let product = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }
    console.log(product, '-=-=-=-=-=-=-')
    Product
      .create(product)
      .then(data => {
        console.log(data, '[][]a[sd]a]s[d]a[s][asd[a]')
        res.status(201).json({
          msg: 'Create Product Success',
          data
        })
      })
      .catch(err => {
        console.log('masuk sini')
        next(err)
      })
  }

  static getProduct (req, res, next) {
    Product
      .findAll({
        include: {
          model: Category
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static updateProduct (req, res, next) {
    let { name, description, imageUrl, price, stock } = req.body
    Product
      .update({
        name,
        description,
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
        res.status(200).json({
          msg: 'Delete product success',
          result
        })
      })
      .catch(next)
  }
}


module.exports = ProductController
