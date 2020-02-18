const {Product, CategoryProduct} = require('../models')

class ProductController {
    static newProduct(req, res, next) {
        Product.create({
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(product => {
                res.status(201).json({
                    msg: 'product created successfully',
                    data: {
                        name: product.name,
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
                CategoryId: req.params.categoryId,
                ProductId: req.params.productId
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
            // include: ['Category']
        })
            .then(products => {
                res.status(200).json({
                    msg: 'get all product',
                    data: products
                })
            })
            .catch(err => {
                next({
                    name: 'NotFound',
                    msg: 'product not found'
                })
            })
    }

    static getOneProduct(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.productId
            }
            // include: ['Category']
        })
            .then(product => {
                if(product) {
                    res.status(200).json({
                        msg: 'get the product',
                        data: product
                    })
                } else {
                    next({
                        name: 'NotFound',
                        msg: 'product not found'
                    })
                }
            })
            .catch(err => {
                next({
                    name: 'NotFound',
                    msg: 'product not found'
                })
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
                return Product.findOne({
                    where: {
                        id: req.params.productId
                    }
                }) 
            })
            .then(product => {
                res.status(200).json({
                    msg: 'product updated successfully',
                    data: {
                        name: product.name,
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

    static deleteProduct(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.productId
            }
        })
            .then(result => {
                if(typeof result == 'number') {
                    return CategoryProduct.destroy({
                        where: {
                            ProductId: req.params.productId
                        }
                    })
                } else if(typeof result == 'object') {
                    next({
                        name: 'NotFound',
                        msg: 'product not found'
                    })
                }
            })
            .then(result => {
                res.status(200).json({
                    msg: 'product deleted successfully'
                })
            })
            .catch(err => {
                next({
                    name: 'NotFound',
                    msg: 'product not found'
                })
            })
    }
}

module.exports = ProductController