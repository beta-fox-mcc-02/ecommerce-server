"use strict"
const { Product } = require('../models')

class ProductController {
    static create(req, res, next){
        console.log(req.bod)
        let { name, image_url, price, stock, RoleId } = req.body
        let newProduct = { name, image_url, price, stock, RoleId }

        Product
            .create(newProduct)
            .then(productCreated => {
                res.status(201).json({
                    data : productCreated,
                    msg: 'success adding a product'
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    static findAll(req, res, next){

        console.log('masuk nih 1')
        Product
            .findAll()
            .then(products => {
                console.log('masuk nih')
                res.status(200).json({
                    data: products,
                    msg: 'success find all data'
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: `Internal Server Error`
                })
            })
    }

    static findOne(req, res, next){
        let id = +req.params.id
        Product
            .findByPk(id)
            .then(product=> {
                if(product) {
                    res.status(200).json({
                        data : product,
                        msg: 'find one success'
                    })
                } else {
                    next({
                        name : `data not found`,
                        status: 404
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err.name
                })
            })
    }

    static update(req, res, next){
        let id = +req.params.id
        let { name, image_url, price, stock, RoleId } = req.body
        let updateData = { name, image_url, price, stock, RoleId }

        Product
            .update(updateData, {
                where : {
                    id : id
                }
            })
            .then(productUpdate => {
                res.status(201).json({
                    data : productUpdate, 
                    msg : "update success"
                })
            })
            .catch(err => {
                next({
                    name : `Internal Server Error`,
                    status : 500
                })
            })
    }

    static delete(req, res, next){
        let id = +req.params.id
        Product
            .destroy({
                where : {
                    id : id
                }
            })
            .then(deleted => {
                res.status(200).json({
                    msg : "delete success"
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error : err
                })
            })
    }
}

module.exports = ProductController