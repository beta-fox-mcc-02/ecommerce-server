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
}

module.exports = CartController;