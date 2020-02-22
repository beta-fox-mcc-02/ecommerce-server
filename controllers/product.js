const { Product } = require('../models')

class Admin {

    static create(req, res, next) {
        const { name, image_url, price, stock, author } = req.body

        Product.create({
            name, image_url, price, stock, author
        })
            .then(data => {
                res.status(201).json({
                    data,
                    message: 'success create product'
                })
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        Product.findAll()
            .then(data => {
                // console.log(data,'><><><><><><><><')
                if (data) {
                    res.status(200).json({
                        data
                    })
                } else {
                    next({
                        status: 404,
                        message: 'Sorry right now our products is out of stock'
                    })
                }
            })
            .catch(next)
    }
    static update(req, res, next) {
        const { name, image_url, price, stock, author } = req.body
        const { id } = req.params

        Product.update({
            name, image_url, price, stock, author
        }, { where: { id }, returning: true })
            .then(data => {
                // console.log(data[1][0].dataValues, 'from controlleeeeeeeeeeeeeeeeeeeeeer');

                res.status(200).json({
                    data: data[1][0].dataValues,
                    message: 'success update product'
                })
            })
            .catch(next)
    }
    static destroy(req, res, next) {
        const { id } = req.params

        Product.destroy({ where: { id } })
            .then(data => {
                res.status(200).json({
                    message: 'success delete product'
                })
            })
            .catch(next)
    }

}

module.exports = Admin