const { Product } = require('../models')

class ProductController {
    static addNewProduct(req, res, next) {
        let payload = {
            name : req.body.name,
            image_url : req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        Product.create(payload)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static getProducts(req, res, next) {
        Product.findAll()
            .then(items => {
                if (items.length > 0) {
                    res.status(200).json({
                        dataItems : items
                    })
                } else {
                    next({
                        name : "NotFound"
                    })
                }
            })
            .catch(next)
    }

    static getById(req, res, next) {
        let id = req.params.id
        Product.findByPk(id)
            .then(item => {
                if (item) {
                    res.status(200).json({
                        dataItem : item
                    })
                } else {
                    next({
                        name : "NotFound"
                    })
                }
            })
            .catch(next)
    }

    static updateItem(req, res, next) {
        let payload = {
            name : req.body.name,
            image_url : req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        let id = req.params.id
        Product.update(payload, {
            where : {
                id : id
            },
            returning : true
        })
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static removeItem(req, res, next) {
        let id = req.params.id
        Product.destroy({where : {
            id : id
        }})
        .then(data => {
            res.status(200).json({data})
        })
        .catch(next)
    }
}

module.exports = ProductController