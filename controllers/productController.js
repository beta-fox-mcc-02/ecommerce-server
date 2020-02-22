const { Product, Category, CategoryProduct } = require('../models')

class ProductController {
    static addProduct (req, res, next) {
        const {name, image_url, price, stock, category} = req.body
        let response = {}
        Product.create({
            name, image_url, stock, price
        })
            .then(product => {
                response = {
                    name: product.name,
                    image_url: product.image_url,
                    price: product.price,
                    stock: product.stock
                }
                const promises = []
                for (let i = 0; i < category.length; i++) {
                    promises.push(CategoryProduct.create({
                        ProductId: product.id,
                        CategoryId: category[i]
                    }))
                }
                return Promise.all(promises)
            })
            .then(data => {
                res.status(201).json(response)
            })
            .catch(next)
    }

    static readProduct (req, res, next) {
        Product.findAll({
            include: [Category]
        })
            .then(products => {
                res.status(200).json({
                    msg: products
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct (req, res, next) {
        const {name, image_url, price, stock, category} = req.body
        const promises = [
            Product.update({
                name, image_url, price, stock
            }, {
                where: {
                    id: req.params.id
                }
            }),
            CategoryProduct.destroy({
                where: {
                    ProductId: req.params.id
                }
            })
        ]
        Promise.all(promises)
            .then(product => {
                const promises2 = []
                for (let i = 0; i < category.length; i++) {
                    promises2.push(CategoryProduct.create({
                        ProductId: req.params.id,
                        CategoryId: req.body.category[i]
                    }))
                }
                return Promise.all(promises2)
            })
            .then(data => {
                res.status(200).json({
                    msg: 'update success',
                    data
                })
            })
            .catch(next)
    }

    static deleteProduct (req, res, next) {
        const promises = [
            Product.destroy({
                where: {
                    id: req.params.id
                }
            }),
            CategoryProduct.destroy({
                where: {
                    ProductId: req.params.id
                }
            })
        ]
        Promise.all(promises)
            .then(product => {
                res.status(200).json({
                    msg: "delete success"
                })
            })
            .catch(next)
    }

    static findByPk (req, res, next) {
        Product.findOne({where: {
            id: req.params.id
        }})
            .then(user => {
                res.status(200).json({
                    msg: user
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = ProductController