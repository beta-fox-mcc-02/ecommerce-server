const {Cart} = require('../models')

module.exports = (req, res, next) => {
   Cart.findOne({
      where: {
         id: req.params.cartId
      }
   })
      .then(data => {
         if (!data) {
            throw ({code: 404, message: `cart with id ${req.params.cartId} not found`})
         }
         else {
            if (data.UserId == req.currentUserId) {
               next()
            }
            else {
               throw ({code: 401, message: `you're not allowed to make this request`})
            }
         }
      })
      .catch(err => {
         next(err)
      })
}