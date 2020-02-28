const { Product, Category } = require('../models')

class ProductController {
  static findAll(req, res, next) {
    Product.findAll({
      include: Category,
      order: [['id']]
    })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static findByPk(req, res, next) {
    let { productId } = req.params
    Product.findByPk(productId, {
      include: Category
    })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static create(req, res, next) {
    let { name, image_url, price, stock, CategoryId } = req.body
    Product.create({ name, image_url, price, stock, CategoryId })
      .then(() => {
        res.status(201).json({ message: "create products successful" })
      })
      .catch(next)
  }

  static update(req, res, next) {
    let { productId } = req.params
    let { name, image_url, price, stock, CategoryId } = req.body
    Product.update({ name, image_url, price, stock, CategoryId }, {
      where: {
        id: productId
      }
    })
      .then(product => {
        if (!product[0]) 
          next({
            name: 'ItemCannotBeFound',
            status: 400,
            errors: [{
              message: "No product updated"
            }]
          })
        else res.status(201).json({ message: "update products successful" })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let { productId } = req.params
    Product.destroy({
      where: {
        id: productId
      }
    })
      .then(response => {
        if (!response)
          next({
            name: 'ItemCannotBeFound',
            status: 400,
            errors: [{
              message: "No product deleted"
            }]
          })
        else res.status(200).json({ message: "Delete product successful" })
      })
      .catch(next)
  }
}

module.exports = ProductController