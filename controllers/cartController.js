const { Cart, Product, User } = require('../models')

class CartController {
    static addToCart (req, res, next) {
        const { ProductId, price, totalItem } = req.body
        Cart.findOne({
            where: {
                ProductId
            }
        })
            .then(data => {
                if (data === null) {
                    console.log('DARI DATA NULL')
                    return Cart.create({
                        UserId: req.currentUserId,
                        ProductId,
                        quantity: totalItem,
                        price: totalItem * price
                    })
                } else {
                    console.log('BUKAN DARI DATA NULL')
                    return Cart.update({
                        quantity: Number(totalItem) + data.quantity,
                        price: (Number(totalItem) + data.quantity) * price
                    }, {
                        where: {
                            ProductId
                        }
                    })
                }
            })
            .then(data => {
                res.status(201).json({
                    msg: 'success add product to cart'
                })
            })
            .catch(err => {
                console.log(err)
                next()
            })
    }
}

module.exports = CartController