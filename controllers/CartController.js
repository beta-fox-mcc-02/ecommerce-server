const { User, Product, Cart } = require('../models');

class CartController {
  static findCurrentItems(req, res, next) {
    const id = req.currentUserId;
    Cart.findAll({
      where: {
        UserId: id,
        status: false
      },
      include: [{
        model: Product,
        attributes: ['name', 'price']
      }]
    })
      .then(carts => {
        if (carts) res.status(200).json(carts);
        else res.status(200).json([]);
      })
      .catch(next);
  }

  static history(req, res, next) {
    const id = req.currentUserId;
    Cart.findAll({
      where: {
        UserId: id,
        status: true
      },
      include: [{
        model: Product,
        attributes: ['name', 'price']
      }]
    })
      .then(carts => {
        if (carts) res.status(200).json(carts);
        else res.status(200).json([]);
      })
      .catch(next);
  }

  static create(req, res, next) {
    const UserId = req.currentUserId;
    const { status, quantity, ProductId } = req.body;
    let productName = '';

    Product.findOne({
      where: { id: ProductId }
    })
      .then(product => {
        const data = {
          UserId,
          ProductId,
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

  static update(req, res, next) {
    const UserId = req.currentUserId;
    const cartId = req.params.id;
    const { ProductId, status, quantity } = req.body;

    Product.findOne({
      where: { id: ProductId }
    })
      .then(product => {
        const data = {
          UserId,
          ProductId,
          status,
          quantity,
          price: product.price * quantity
        };

        return Cart.update(data, {
          where: { id: cartId }
        });
      })
      .then(cart => {
        res.status(200).json({ message: 'Success Update Cart' });
      })
      .catch(next);
  }

  static destroy(req, res, next) {
    const cartId = req.params.id;
    Cart.destroy({
      where: { id: cartId }
    })
      .then(() => {
        res.status(200).json({ message: 'Success Delete Cart' });
      })
      .catch(next);
  }

  // static checkout(req, res, next) {
  //   const { data } = req.body;
  //   Cart.bulkCrea
  // }
}

module.exports = CartController;