const { Cart, Product, User } = require('../models')

class CartController {
    static addToCart (req, res, next) {
        console.log('DSINIIIII BANNGGG')
        const { ProductId, price, totalItem } = req.body
        Cart.findOne({
            where: {
                ProductId,
                UserId: req.currentUserId
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
                    if (data.status === true) {
                        return Cart.update({
                            quantity: Number(totalItem),
                            price: Number(totalItem) * price,
                            status: false
                        }, {
                            where: {
                                ProductId
                            }
                        })
                    } else {
                        return Cart.update({
                            quantity: Number(totalItem) + data.quantity,
                            price: (Number(totalItem) + data.quantity) * price
                        }, {
                            where: {
                                ProductId
                            }
                        })
                    }
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
                UserId: req.currentUserId,
                status: false
            }, 
            attributes: ['id', 'quantity', 'price'],
            include: [Product, User],
            order: [['id']]
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

    static destroy (req, res, next) {
        const id = req.params.id
        Cart.destroy({
            where: {
                id
            }
        })
            .then(data => {
                console.log(data)
                res.status(200).json({
                    msg: 'success delete from cart'
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static update (req, res, next) {
        const price = req.body.quantity * req.body.price
        Cart.update({
            quantity: req.body.quantity,
            price
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                console.log(data)
                res.status(200).json({
                    data,
                    msg: 'update success'
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static payment (req, res, next) {
        const { carts } = req.body
        let err = []
        const promises = []
        console.log(carts[0].quantity > carts[0].Product.stock)
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].quantity > carts[i].Product.stock) {
                err.push(1)
            } else {
                promises.push(
                    Cart.update({
                        status: true
                    }, {
                        where: {
                            id: carts[i].id
                        }
                    }), 
                    Product.update({
                        name: carts[i].Product.name,
                        image_url: carts[i].Product.image_url,
                        price: carts[i].Product.price,
                        stock: carts[i].Product.stock - carts[i].quantity
                    }, {
                        where: {
                            id: carts[i].Product.id
                        }
                    })
                )
            }
        }
        if (err.length > 0) {
            // belum dikirim kedepan
            next({
                name: 'Stock unavailable',
                status: 404
            })
        } else {
            Promise.all(promises)
                .then(data => {
                    console.log('berhasiill doonggsss')
                    res.status(201).json({
                        data
                    })
                })
                .catch(err => {
                    next(err)
                })
        }

    }
}

module.exports = CartController