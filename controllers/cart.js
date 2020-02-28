const { Cart, User, Product, sequelize } = require('../models')

module.exports = {
    findAll(req, res, next) {
        const UserId = req.decoded.id
        Cart.findAll({
            where: { UserId, status: false },
            include: [User, Product],
            order: [['ProductId', 'ASC']]
        })
            .then((data) => {
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
                    let newTotal = +data.dataValues.total + (+amount * +price)
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
        const { id } = req.decoded
        let promises = []

        Cart.findAll({
            where: {
                UserId: id,
                status: false
            },
            include: ['Product']
        })
            .then(data => {
                return sequelize.transaction(t => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].dataValues.Product.dataValues.stock < data[i].dataValues.amount) {
                            next({
                                status: 400,
                                message: 'Stock is less than your cart amount'
                            })
                        } else {
                            promises.push(
                                Cart.update(
                                    { status: true },
                                    { where: { id: data[i].id } },
                                    { transaction: t }
                                ),
                                Product.update(
                                    { stock: data[i].Product.dataValues.stock - data[i].amount, },
                                    { where: { id: data[i].Product.dataValues.id } },
                                    { transaction: t }
                                )
                            )
                        }
                    }
                    return Promise.all(promises)
                })
            })
            .then(data => {
                res.status(200).json({
                    data,
                    message: 'success checkout cart'
                })
            })
            .catch(err => {
                next(err)
            })
    },
    updateAmount(req, res, next) {
        const { newAmount } = req.body
        const { id } = req.params
        Cart.update({
            amount: newAmount
        }, { where: { id } })
            .then(data => {
                res.status(200).json({
                    data,
                    message: 'success update amount'
                })
            })
            .catch(next)
    },
    deleteOneCart(req, res, next) {
        const { id } = req.params

        Cart.destroy({
            where: { id }
        })
            .then(data => {
                res.status(200).json({
                    message: 'success delete cart'
                })
            })
            .catch(next)
    }
}