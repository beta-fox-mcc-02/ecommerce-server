const { Cart } = require('../models')

class CartController {
    static addToCart (req, res, next) {
        const { quantity, price } = req.body
        const UserId = req.currentUserId
        const ProductId = req.params.id
        Cart.create({ UserId, ProductId, quantity, price })
            .then(data => {
                res.status(200).json('Product has been successfully added to Cart!')
            })
    }
}

module.exports = CartController