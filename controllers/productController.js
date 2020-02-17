const {Product, CategoryProduct} = require('../models')

class ProductController {
    static newProduct(req, res, next) {
        Product.create({
            name: req.body.email,
            description: req.body.description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(product => {
                res.status(201).json({
                    msg: 'product created successfully',
                    data: {
                        name: product.email,
                        description: product.description,
                        image_url: product.image_url,
                        price: product.price,
                        stock: product.stock
                    }
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static addTags(req, res, next) {
        CategoryProduct.create({
            CategoryId: req.params.categoryId,
            ProductId: req.params.productId
        })
            .then(result => {
                res.status(200).json({
                    msg: 'adding tags success'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static removeTags(req, res, next) {
        CategoryProduct.destroy({
            where: {
                CategoryId: req.params.categoryId
            }
        })
            .then(result => {
                res.status(200).json({
                    msg: 'removing tags success'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static allProduct(req, res, next) {
        Product.findAll({
            include: ['Category']
        })
            .then(products => {
                res.status(200).json({
                    msg: 'get all product',
                    data: products
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static getOneProduct(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.productId
            }
        })
            .then(product => {
                res.status(200).json({
                    msg: 'get the product',
                    data: product
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static updateProduct(req, res, next) {
        Product.update({
            name: req.body.email,
            description: req.body.description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }, {
            where: {
                id: req.params.productId
            }
        })
            .then(product => {
                res.status(200).json({
                    msg: 'update product success',
                    data: product
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.productId
            }
        })
            .then(result => {
                return CategoryProduct.destroy({
                    where: {
                        ProductId: req.params.productId
                    }
                })
            })
            .then(result => {
                res.status(200).json({
                    msg: 'delete product success'
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController