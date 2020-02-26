const { sequelize, Product, Cart } = require('../models');

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
      }],
      order: [['id', 'ASC']]
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
        if (product.stock < quantity) {
          next({ status: 400, message: 'Not Enough Product' });
        } else {
          const data = {
            UserId,
            ProductId,
            status,
            quantity,
            price: product.price * quantity
          };
          Cart.update(data, {
            where: { id: cartId }
          })
            .then(cart => {
              res.status(200).json({ message: 'Success Update Cart' });
            })
            .catch(next);
        }
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

  static checkout(req, res, next) {
    const { carts } = req.body;
    const UserId = req.currentUserId;

    sequelize.transaction(t => {
      const promises = [];
      carts.forEach(el => {
        const newPromise = Product.findOne({
          where: { id: el.ProductId },
          transaction: t
        });
        promises.push(newPromise);
      });
      return Promise.all(promises).then(products => {
        const updatePromises = [];
        products.forEach((el, index) => {
          const data = {
            name: el.name,
            image_url: el.image_url,
            price: el.price,
            stock: el.stock - carts[index].quantity
          };
          const newPromise = Product.update(data, {
            where: { id: el.id },
            transaction: t
          });
          updatePromises.push(newPromise);
        });

        return Promise.all(updatePromises).then(products => {
          const cartPromises = [];
          carts.forEach(el => {
            const data = {
              id: el.id,
              UserId: el.UserId,
              ProductId: el.ProductId,
              status: true,
              quantity: el.quantity,
              price: el.price * el.quantity
            };
            const newPromise = Cart.update(data, {
              where: { id: data.id },
              transaction: t
            });
            cartPromises.push(newPromise);
          });
          return Promise.all(cartPromises);
        });
      });
    })
      .then(result => {
        console.log(result);
        console.log('berhasil');
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
}

module.exports = CartController;