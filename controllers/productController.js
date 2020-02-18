const { Product } = require('../models')

class ProductController {
    static addProduct (req, res, next) {
        const {name, image_url, price, stock} = req.body  
        Product.create({
            name, image_url, stock, price
        })
            .then(product => {
                res.status(201).json({
                    name: product.name,
                    image_url: product.image_url,
                    price: product.price,
                    stock: product.stock
                })
            })
            .catch(next)
    }

    static readProduct (req, res, next) {
        Product.findAll()
            .then(products => {
                if (products.length === 0) {
                    res.status(200).json({
                        msg: 'Product empty'
                    })
                } else {
                    res.status(200).json({
                        msg: products
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct (req, res, next) {
        const {name, image_url, price, stock} = req.body
        Product.update({
            name, image_url, price, stock
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(product => {
                res.status(200).json({
                    name: name,
                    image_url: image_url,
                    price: price,
                    stock: stock
                })
            })
            .catch(next)
    }

    static deleteProduct (req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(product => {
                res.status(200).json({
                    msg: "delete success"
                })
            })
            .catch(next)
    }
}

module.exports = ProductController