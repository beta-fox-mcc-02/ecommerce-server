const { Product } = require('../models');

class ProductController {
  static create(req, res, next) {
    const { name, image_url, price, stock } = req.body;
    const data = { name, image_url, price, stock };
    Product.create(data)
      .then(product => {
        res.status(201).json({ message: 'Success Create Product' })
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Product.findAll()
      .then(products => {
        res.status(200).json({ data: products })
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    const { id } = req.params;
    Product.findOne({
      where: { id }
    })
      .then(product => {
        if (product)
          res.status(200).json({ data: product });
        else
          next({ status: 400, message: 'Not Found' })
      })
      .catch(next)
  }
}

module.exports = ProductController;