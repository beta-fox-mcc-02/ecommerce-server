const { User, Product, Cart } = require('../models');

class CartController {
  static findCurrentItems(req, res, next) {
    const id = req.currentUserId;
    User.findOne({
      where: { id, role: 'customer' },
      include: [
        {
          model: Cart,
          where: {
            status: false
          }
        }
      ]
    })
      .then(user => {
        if (user) res.status(200).json(user);
        else res.status(200).json([]);
      })
      .catch(next);
  }

  static history(req, res, next) {
    const id = req.currentUserId;
    User.findOne({
      where: { id, role: 'customer' },
      include: [
        {
          model: Cart,
          where: {
            status: true
          }
        }
      ]
    })
      .then(user => {
        if (user) res.status(200).json(user);
        else res.status(200).json([]);
      })
      .catch(next);
  }

  static create(req, res, next) {
    const userId = req.currentUserId;
    const cartId = req.params.id;
    const productId = req.params.productId;
    const { status, quantity } = req.body;
    let productName = '';
    // find particular price
    // create data
    // insert to db

    Product.findOne({
      where: { id: productId }
    })
      .then(product => {
        const data = {
          UserId: userId,
          ProductId: productId,
          status,
          quantity,
          price: quantity * product.price
        };
        productName = product.name;
        return Cart.create(data);
      })
      .then(cart => {
        res.status(201).json({ message: `Success Add ${productName} to Cart` });
      })
      .catch(next);

  }
}

module.exports = CartController;