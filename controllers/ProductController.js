const { Product } = require('../models')

class ProductController {
    static create (req, res, next) {
        const { name, image_url, price, stock } = req.body
        console.log(req.body, 'heyyy ini req body product heyyyy')
        Product.create({ name, image_url, price, stock })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static read (req, res, next) {
        Product.findAll({})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }
}

module.exports = ProductController