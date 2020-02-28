const { Cart, Product } = require('../models')

class CartController {
    static addToCart (req, res, next) {
        const { ProductId, quantity, price } = req.body
        const CustomerId = req.currentUserId
        Cart.create({ CustomerId, ProductId, quantity, price })
            .then(data => {
                res.status(200).json('Product has been successfully added to Cart!')
            })
            .catch(next)
    }

    static viewCart (req, res, next) {
        const CustomerId = req.currentUserId
        Cart.findAll({
            where: { CustomerId, status: false },
            include: [Product],
            order: [['createdAt', 'ASC']]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = CartController