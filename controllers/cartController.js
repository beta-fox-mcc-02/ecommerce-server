const { Cart, Product } = require('../models')

class CartController {
    static productsInCart (req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.decoded.id,
                status: false
            },
            order: [['id', 'ASC']],
            include: [Product],
            attributes: {
                include: ['id']
            }
        })
            .then(data => {
                res.status(200).json({
                    msg: 'successfully fetch cart data',
                    data: data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteAllFromCart (req, res, next) {
        Cart.destroy({
            where: {
                UserId: req.decoded.id,
                status: false
            }
        })
            .then(data => {
                res.status(200).json({
                    msg: 'successfully delete all item(s)',
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static addCart (req, res, next) {
        Cart.findOne({
            where: {
                UserId: req.decoded.id,
                ProductId: req.params.productId,
                status: false
            }
        })
            .then(data => {
                if (data) {
                    next({
                        name: 'Forbidden',
                        msg: 'this item has already added to your cart'
                    })
                } else {
                    return Cart.create({
                        UserId: req.decoded.id,
                        ProductId: req.params.productId
                    })
                }
            })
            .then(cart => {
                res.status(201).json({
                    msg: 'successfully added to your cart',
                    data: cart
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteFromCart (req, res, next) {
        Cart.destroy({
            where: {
                id: req.params.cartId
            }
        })
            .then(result => {
                res.status(200).json({
                    msg: 'successfully deleted from your cart'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static changeQuantity (req, res, next) {
        let promise;
        if (req.body.value > 0) {
            promise = Cart.increment('quantity', {
                where: {
                    id: req.params.cartId
                }
            })
        } else {
            promise = Cart.decrement('quantity', {where: {
                id: req.params.cartId
            }})
        }
        promise
            .then(result => {
                if (result[0][0][0].quantity < 1) {
                    next({
                        name: 'Forbidden',
                        msg: 'Keep the quantity at 1 in the cart'
                    })
                } else {
                    res.status(200).json({
                        msg: 'quantity changed'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static checkout (req, res, next) {
        let checkoutCart;
        Cart.findAll({
            where: {
                UserId: req.decoded.id,
                status: false
            },
            order: [['id', 'ASC']],
            include: [Product],
            attributes: {
                include: ['id']
            }
        })
            .then(data => {
                checkoutCart = data
                let promises = []
                data.forEach(el => {
                    if (el.quantity <= el.Product.stock) {
                        promises.push(Cart.update({
                            status: true
                        }, {
                            where: {
                                id: el.id
                            }
                        }))
                    } else {
                        next({
                            name: 'Forbidden',
                            msg: `product ${el.Product.name}'s stock is not enough`
                        })
                    }
                })
                return Promise.all(promises)
            })
            .then(result => {
                let anotherPromises = []
                checkoutCart.forEach(el => {
                    anotherPromises.push(Product.decrement('stock', {
                        by: el.quantity,
                        where: {
                            id: el.ProductId
                        }
                    }))
                    anotherPromises.push(Product.increment('sold', {
                        by: el.quantity,
                        where: {
                            id: el.ProductId
                        }
                    }))
                })
                return Promise.all(anotherPromises)
            })
            .then(result => {
                res.status(200).json({
                    msg: 'Checkout Success'
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CartController