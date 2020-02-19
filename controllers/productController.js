const { Product } = require('../models')

class Controller {
    static createProduct(req, res, next) {
        const { name, image_url, price, stock} = req.body

        Product.create({
            name: name,
            image_url: image_url,
            price: price,
            stock: stock
        })
            .then(response => {
                res.status(201).json({
                    msg: 'create product success',
                    data: response
                })
            })
            .catch(err => {
                next(err)
            })
    }
    
    static fetchAll(req, res, next) {
        Product.findAll()
            .then(response => {
                res.status(200).json({
                    msg: 'fetch all products success',
                    data: response
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static fetchOne(req, res, next) {
        const { id } = req.params
        const err = {
            name: 'errorNotFound'
        }

        Product.findOne({
            where: {
                id: id
            }
        })
            .then(response => {
                if (response) {
                    res.status(200).json({
                        msg: 'fetch one products success',
                        data: response
                    })
                } else {
                    next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next) {
        const { id } = req.params
        const { name, image_url, price, stock } = req.body
        const err = {
            name: 'errorNotFound'
        }

        Product.update(
            {
                name: name,
                image_url: image_url,
                price: price,
                stock: stock
            }, {
                where: {
                    id: id
                },
                returning: true
            })
            .then(response => {
                if (!response[0]) {
                    next(err)
                } else {
                    res.status(200).json({
                        msg: `success update product id:${id}`,
                        data: response
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        const { id } = req.params
        const err = {
            name: 'errorNotFound'
        }

        Product.destroy({
            where: {
                id: id
            }
        })
            .then(response => {
                if (response) {
                    res.status(200).json({
                        msg: `success delete product id:${id}`
                    })
                } else {
                    next(err)
                }
            })
            .catch(err)
    }
}

module.exports = Controller