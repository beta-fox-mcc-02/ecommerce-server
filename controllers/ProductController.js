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

    static update (req, res, next) {
        const id = req.params.id
        const { name, image_url, price, stock } = req.body
        Product.update({ name, image_url, price, stock }, {
            where: { id },
            returning: true
        })
            .then(data => {
                if(!data[0]) {
                    res.status(404).json({
                        msg: 'Data not found'
                    })
                }
                else {
                    res.status(200).json(data[1])
                }
            })
            .catch(next)
    }

    static delete (req, res, next) {
        const id = req.params.id
        Product.destroy({ where: { id } })
            .then(deleted => {
                if(!deleted) {
                    res.status(404).json({
                        msg: 'Data not found'
                    })
                }
                else {
                    res.status(200).json({
                        msg: 'Product has been successfully deleted'
                    })
                }
            })
            .catch(next)
    }
}

module.exports = ProductController