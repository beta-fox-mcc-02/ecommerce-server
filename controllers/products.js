const { Product } = require('../models/index');

class Controller {
  static addProduct(req, res, next) {
    let newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    };
    Product.create(newProduct)
      .then(newProduct => {
        res.status(201).json({
          id: newProduct.id,
          name: newProduct.name,
          image_url: newProduct.image_url,
          price: newProduct.price,
          stock: newProduct.stock
        });
      })
      .catch(err => {
        next(err);
      })
  }
  static editProduct(req, res, next) {
    let update = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    };
    Product.update(update, {
      where: {
        id: req.params.productId
      },
      returning: true
    })
      .then(data => {
        if (data[0]) {
          res.status(200).json(data[1][0]);
        } else {
          next({
            status: 404,
            message: 'Product not found'
          });
        }
      })
      .catch(err => {
        next(err);
      })
  }
  static deleteProduct(req, res, next) {
    Product.destroy({
      where: {
        id: req.params.productId
      }
    })
      .then(data => {
        if (data) {
          res.status(200).json({
            data,
            message: 'Deleted'
          });
        } else {
          next({
            status: 404,
            message: 'Product not found',
          });
        }
      })
      .catch(err => {
        next(err);
      })
  }
  static getProducts(req, res, next) {
    Product.findAll({
      order: [['id', 'ASC']],
    })
      .then(products => {
        res.status(200).json(products);
      })
      .catch(err => {
        next(err);
      })
  }
  static findProduct(req, res, next) {
    Product.findOne()
      .then(product => {
        if (product) {
          res.status(200).json(product);
        } else {
          next({
            status: 404,
            message: 'Product not found',
          });
        }
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = Controller;
