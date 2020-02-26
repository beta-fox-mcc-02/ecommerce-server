const { Cart } = require('../models');

module.exports = (req, res, next) => {
  const userId = req.currentUserId;
  const cartId = req.params.id;
  const productId = req.params.productId;

  Cart.findOne({
    where: {
      id: cartId
    }
  })
    .then(cart => {
      if (cart) {
        if (cart.UserId === userId && cart.ProductId == productId) next();
        else next({ status: 401, message: 'You Are Not Authorized' });
      } else {
        next({ status: 404, message: 'Not Found' });
      }
    })
    .catch(next);
};