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
    const { ProductId, status, quantity, cartStatus } = req.body;

    // check cartStatus if increment item or decrement

    // check whether the quantity is enough or not
    Product.findOne({
      where: { id: ProductId }
    })
      .then(product => {
        if (product.stock < quantity) {
          let stock = 'stocks';
          if (product.stock === 1) stock = 'stock';
          next({ status: 400, message: `Only ${product.stock} ${stock} for ${product.name}` });
        } else {
          const data = {
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            stock: product.stock - quantity
          };

          return Product.update(data, {
            where: { id: ProductId },
            returning: true,
            plain: true
          });
        }
      })
      .then(product => {
        const data = {
          UserId,
          ProductId,
          status,
          quantity,
          price: quantity * product[1].price
        };

        // update cart
        return Cart.update(data, {
          where: { id: cartId },
          returning: true
        });
      })
      .then(cart => {
        // send success status
        res.status(200).json({ message: `Success Update Item` });
      })
      .catch(next);
  }
}

module.exports = CartController;