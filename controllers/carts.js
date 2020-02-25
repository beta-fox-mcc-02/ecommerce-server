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
};

module.exports = Controller;
