const { Cart, Product } = require('../models')

class CartController {
    static create(req, res, next) {
        let { CostumerId, ProductId} = req.body
        let newCart = { CostumerId, ProductId }
        newCart.quantity = 1
        Cart
            .create(newCart)
            .then(cart => {
                return Product.findOne({where : {
                    id: ProductId
                }})
            })
            .then(product => {
                console.log(product)
                console.log('MASOOOK WEEEEOOOOOYYYYY')
                let { stock } = product
                stock--
                console.log(stock)
                return Product.update({stock}, {
                    where: {
                        id: ProductId
                    }
                })
            })
            .then(product => {
                // conso
                console.log('ini HASIL UPDATEEE', product)
                res.status(201).json(
                    product
                )
                
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, res, next) {
        let id = req.params.id
        console.log(req.params, 'ini req.bodynyAAAAAAAAAAAAAA==========================')
        Cart
            .findAll({
                where: {
                    CostumerId : id
                },
                include: [Product],
                attributes: [ 'id', 'CostumerId','ProductId', 'quantity' ]
            })
            .then(carts => {
                // console.log(req.currentUserId, 'ini di findAllnya cart-------------------------------------')
                res.status(200).json(
                    carts
                )
            })
            .catch(err => {
                next(err)
            })
    }


    static findOne(req, res, next) {
        let id =  +req.params.cartId
        console.log('ini ID NYAAAAAAAAAAAA', id)
        console.log(id)
        Cart
            .findByPk(id, {
                include: [ Product ]
            })
            .then(cart => {
                res.status(200).json(
                    cart
                )
            })
            .catch(err => {
                next(err)
            })
    }

    // static findOne(req, res, next) {
    //     let { ProductId } = req.body
    //     Cart
    //         .findOne({
    //             where: {
    //                 CostumerId: req.currentCostumerId,
    //                 ProductId: ProductId
    //             }
    //         })
    //         .then(cart => {
    //             res.status(200).json(
    //                 cart
    //             )
    //         })
    //         .catch(err => {
    //             next(err)
    //         })
    // }

    static update(req, res, next) {
        let id = +req.params.id
        let { CostumerId, ProductId, quantity} = req.body
        let updateCart = { CostumerId, ProductId, quantity }
        Cart
            .create(updateCart, {
                where: {
                    id: id
                }
            })
            .then(cart => {
                res.status(201).json(
                    cart
                )
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        console.log('MASUK DELETE')
        Cart
            .destroy({
                where: {
                    id: id
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CartController