const { Cart } = require('../models/index');

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
};

module.exports = Controller;
