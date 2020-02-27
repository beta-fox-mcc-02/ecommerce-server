const { Cart, User, Product } = require('../models')

module.exports = {
    findAll(req, res, next) {
        const UserId = req.decoded.id
        Cart.findAll({
            where: { UserId, status: false },
            include: [User, Product]
        })
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(next)
    },
    addCart(req, res, next) {
        const { amount, price } = req.body
        const UserId = req.decoded.id
        const ProductId = req.params.id
        let status = null

        Cart.findOne({
            where: { UserId, ProductId, status: false }
        })
            .then(data => {
                if (data) {
                    let newAmount = +data.dataValues.amount + +amount
                    let newTotal = +data.dataValues.price + +price
                    status = 200
                    return Cart.update({
                        amount: newAmount,
                        total: newTotal
                    }, {
                        where: {
                            id: +data.dataValues.id
                        },
                        returning: true
                    })
                }
                else {
                    status = 201
                    return Cart.create({
                        UserId, ProductId, amount, price, total: +amount * +price
                    })
                }
            })
            .then(data => {
                res.status(status).json({
                    message: 'success add product to your cart'
                })
            })
            .catch(next)
    },
    checkOutCart(req, res, next) {
        const { cart } = req.body
        let err = []
        let promises = []

        for (let i = 0; i < cart.cart.length; i++) {
            if (cart.cart[i].Product.stock < cart.cart[i].amount) {
                err.push('x')
            } else {
                promises.push(
                    Cart.update({
                        status: true
                    }, {
                        where: { id: cart.cart[i].id }
                    }),
                    Product.update({
                        stock: cart.cart[i].Product.stock - cart.cart[i].amount,
                    }, { where: { id: cart.cart[i].Product.id } })
                )
            }
        }

        if (err[0] == 'x') {
            next({
                status: 404,
                message: 'stock is empty'
            })
        } else {
            Promise.all(promises)
                .then(data => {
                    res.status(200).json({
                        data
                    })
                })
                .catch(err => {
                    next(err)
                })
        }
    }
}