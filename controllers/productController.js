const {Product, CategoryProduct, Category} = require('../models')
const { Op } = require('sequelize')

class ProductController {
    static newProduct(req, res, next) {
        let newProduct;
        Product.create({
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(product => {
                newProduct = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    image_url: product.image_url,
                    price: product.price,
                    stock: product.stock,
                    categories: req.body.categories
                }
                if(req.body.categories.length) {
                    return Category.findAll({
                        where: {
                            name: {
                                [Op.in]: req.body.categories
                            }
                        }
                    })
                } else {
                    next({
                        name: 'EmptyCategory',
                        msg: 'category required at least 1'
                    })
                }
            })
            .then(categories => {
                let createCategoryProducts = []
                categories.forEach(category => {
                    let promiseCreateCategoryProduct = CategoryProduct.create({
                        CategoryId: category.id,
                        ProductId: newProduct.id
                    })
                    createCategoryProducts.push(promiseCreateCategoryProduct)
                })
                return Promise.all(createCategoryProducts)
            })
            .then(result => {
                res.status(201).json({
                    msg: 'product created successfully',
                    data: newProduct
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static allProduct(req, res, next) {
        Product.findAll({
            include: [Category]
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
            },
            include: [Category]
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
        let updateProduct;
        Product.update({
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            categories: req.body.categories
        }, {
            where: {
                id: req.params.productId
            },
            returning: true
        })
            .then(product => {
                updateProduct = {
                    id: product[1][0].id,
                    name: product[1][0].name,
                    description: product[1][0].description,
                    image_url: product[1][0].image_url,
                    price: product[1][0].price,
                    stock: product[1][0].stock
                }
                return CategoryProduct.destroy({
                    where: {
                        ProductId: updateProduct.id
                    }
                })
            })
            .then(result => {
                if(req.body.categories.length) {
                    return Category.findAll({
                        where: {
                            name: {
                                [Op.in]: req.body.categories
                            }
                        }
                    })
                } else {
                    next({
                        name: 'EmptyCategory',
                        msg: 'category required at least 1'
                    })
                }
            })
            .then(categories => {
                let createCategoryProducts = []
                categories.forEach(category => {
                    let promiseCreateCategoryProduct = CategoryProduct.create({
                        CategoryId: category.id,
                        ProductId: updateProduct.id
                    })
                    createCategoryProducts.push(promiseCreateCategoryProduct)
                })
                return Promise.all(createCategoryProducts)
            })
            .then(result => {
                res.status(200).json({
                    msg: 'product updated successfully',
                    data: updateProduct
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