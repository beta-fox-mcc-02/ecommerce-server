const { Product } = require('../models')

class ProductController{
    static create(req, res, next) {
        Product.create({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        })
        .then((data) => {
            res.status(201).json({ message: `successfully added ${data.name} to database` })
        })
        .catch(err => next(err))
    }

    static findall(req, res, next) {
        Product.findAll({
            attributes: ['id', 'name', 'imageUrl', 'price', 'stock']
        })
        .then((data) => {
            res.status(200).json({ products: data })
        })
        .catch(err => next(err))
    }
}

module.exports = ProductController