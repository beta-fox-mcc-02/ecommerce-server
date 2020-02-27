const { Cart, Product } = require('../models/index');

class Controller {
  static createCart(req, res, next) {
    let newCart = {
      PersonId: req.body.PersonId,
      ProductId: req.body.ProductId,
      quantity: req.body.quantity,
    }
    Cart.create(newCart)
      .then(cart => {
        res.status(201).json(cart);
      })
      .catch(err => {
        next(err);
      })
  }
  static findCart(req, res, next) {
    Cart.findAll({
      where: {
        PersonId: req.params.personId,
        ProductId: req.params.productId,
      }
    })
      .then(carts => {
        res.status(200).json(carts);
      })
      .catch(err => {
        next(err);
      })
  }
  static editCart(req, res, next) {
    let update = {
      PersonId: req.params.personId,
      ProductId: req.params.productId,
      quantity: req.body.quantity,
      price: '',
    };
    Cart.update(update, {
      where: {
        PersonId: req.params.personId,
        ProductId: req.params.productId,
      },
      returning: true,
    })
      .then(response => {
        if (Array.isArray(response)) {
          if (response[0]) {
            res.status(200).json(response[1]);
          } else {
            next({
              message: 'Cart not found',
              status: 404
            })
          }
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        next(err);
      })
  }
  static deleteCart(req, res, next) {
    Cart.destroy({
      where: {
        PersonId: req.params.personId,
        ProductId: req.params.productId,
      }
    })
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        next({
          message: 'Cart not found',
          status: 404
        })
      }
    })
    .catch(err => {
      next(err);
    })
  }
  static checkoutCart(req, res, next) {
    let paidQuantity;
    Cart.findOne({
      where: {
        PersonId: req.params.personId,
        ProductId: req.params.productId,
      }
    })
      .then(response => {
        if (response) {
          paidQuantity = response.quantity;
          let update = {
            PersonId: response.PersonId,
            ProductId: response.ProductId,
            price: response.price,
            quantity: response.quantity,
            paid: true,
          }
          return Cart.update(update, {
            where: {
              PersonId: req.params.personId,
              ProductId: req.params.productId,
            },
            returning: true,
          })
        } else {
          next({
            message: 'Product not found',
            status: 404
          })
        }
      })
      .then(response => {
        if (response) {
          return Product.findOne({
            where: {
              id: req.params.productId, 
            },
          })
        } else {
          next({
            message: 'Cart not found',
            status: 404
          })
        }
      })
      .then(response => {
        let updateStock = response.stock - paidQuantity;
        let update = {
          name: response.name,
          image_url: response.image_url,
          price: response.price,
          stock: updateStock,
        }
        return Product.update(update, {
          where: {
            id: req.params.productId,
          }
        })
      })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        next(err);
      })
  }
};

module.exports = Controller;
