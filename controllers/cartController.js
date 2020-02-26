const { Cart, Product, User } = require('../models')

class CartController {
    static addToCart (req, res, next) {
        console.log('DSINIIIII BANNGGG')
        const { ProductId, price, totalItem } = req.body
        Cart.findOne({
            where: {
                ProductId
            }
        })
            .then(data => {
                console.log(data, 'INIII DATAAAAAAAA')
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
                console.log('BERHASIILLLL')
                console.log(data)
                res.status(201).json({
                    msg: 'success add product to cart'
                })
            })
            .catch(err => {
                console.log(err)
                next()
            })
    }

    static fetchCart (req, res, next) {
        console.log('masuk bang')
        Cart.findAll({
            where: {
                UserId: req.currentUserId
            }, 
            include: [Product, User]
        })
            .then(carts => {
                console.log(carts)
                res.status(200).json({
                    msg: carts
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = CartController