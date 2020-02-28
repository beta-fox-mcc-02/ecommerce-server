const {
    Cart,
    User,
    Product
} = require('../models')
let quantityUpdate = ''

class CartController {
    static findAll(req, res, next) {
        Cart.findAll({
            include: [{
                model: Product, User
            }],
            where: {
                UserId: req.UserId,
                status: false
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    
    static findHistory(req, res, next) {
        Cart.findAll({
            include: [{
                model: Product, User
            }],
            where: {
                UserId: req.UserId,
                status: true
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next) {
        Cart.create({
            UserId: req.UserId,
            ProductId: req.body.ProductId,
            total_price: +req.body.total_price,
            quantity: 1,
            status: false
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        console.log('Masuk findOne controller')
        Cart.findOne({
            where: {
                ProductId: req.params.id,
                status: false
            }
        })
            .then(data => {
                if(data) {
                    quantityUpdate = data.quantity
                    res.status(200).json(data)
                } else {
                    next()
                }
            })
            .catch(err => {
                console.log(err, 'gagal findone controller ====================')
                next(err)
            })
    }

    static update(req, res, next) {
        console.log('masuk update controller')
        console.log(quantityUpdate, 'value quantity')
        console.log(req.body.quantity, 'req body quantity')
        console.log(req.params.id, 'ini params id')
        Cart.update(
            {
                quantity: quantityUpdate + +req.body.quantity
            }, {
            where: {
                ProductId: req.params.id,
                status: false
            }})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err, 'error update controller')
                next(err)
            })
    }

    static delete(req, res, next) {
        // console.log('Masuk delete controller')
        Cart.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                // console.log(err, 'error controller delete =================')
                next(err)
            })
    }

    static checkout(req, res, next) {
        Cart.findOne({
            include: [{
                model: Product
            }],
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(data.quantity <= data.Product.stocks) {
                    return Product.update({
                        stocks: data.Product.stocks - data.quantity
                    },
                    {
                        where: {
                            id: data.Product.id
                        }
                    })
                    .then(data => {
                        return Cart.update({
                            status: true
                        }, {
                            where: {
                                id: req.params.id
                            }
                        })
                    })
                    .then(data => {
                        res.status(200).json(data)
                    })
                } else {
                    let err = {
                        error: 'Stocks not available',
                        msg: 'Stocks not available'
                    }
                    next(err)
                }
            })
            .catch(err => {
                let error = {
                    error: 'Stocks not available',
                    msg: 'Stocks not available'
                }
                next(error)
            })
    }
}

module.exports = CartController