const { Product, Category } = require('../models')

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
            include: [Category]
        })
        .then((data) => {
            res.status(200).json({ products: data })
        })
        .catch(err => next(err))
    }

    static update(req, res, next) {
        Product.update({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            stock: req.body.stock
        }, {
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            if(data) {
                res.status(200).json({ 
                    products: data,
                    message: `success update product at id ${req.params.id}`
                })
            }
            else next({ message: `product may has been already deleted` })
        })
        .catch(err => next(err))
    }

    static delete(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            if(data) res.status(200).json({ message: `success deleted product at id ${req.params.id}` })
            else next({ message: `product may has been already deleted` })
        })
        .catch(err => next(err))
    }
}

module.exports = ProductController