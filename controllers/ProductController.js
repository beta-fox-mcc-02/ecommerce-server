const { Product } = require('../models')

class ProductController {
    static create(req, res, next) {
        const { name, image_url, price, stock } = req.body
        const product = {
            name,
            image_url,
            price,
            stock
        }

        Product.create(product)
            .then(result => {
                res.status(201).json({ product: result })
            })
            .catch(next)
    }
    static findOne(req, res, next) {
        const { id } = req.params
        Product.findByPk(id)
            .then(result => {
                if (result) {
                    res.status(200).json({ product: result })
                } else {
                    next({ name: 'productNotFound' })
                }
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        Product.findAll()
            .then(result => {
                res.status(200).json({ products: result })
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { name, image_url, price, stock } = req.body
        const { id } = req.params
        const product = {
            name,
            image_url,
            price,
            stock
        }
        Product.update(product, { where: { id }, returning: true })
            .then(result => {
                res.status(200).json({ product: result[1][0] })
            })
            .catch(next)
    }
    static delete(req, res, next) {
        const { id } = req.params
        Product.destroy({ where: { id } })
            .then(result => {
                res.status(204).json({})
            })
            .catch(next)
    }
}

module.exports = ProductController
