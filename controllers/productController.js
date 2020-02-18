const {Admin, Product} = require('../models')

class Controller{
    static add(req, res, next){
        newProduct = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }
        Product.create(newProduct)
            .then(product => {
                res.status(201).json({product})
            })
            .catch(next)
    }
    static productList(req, res, next){
        Product.findAll()
            .then(product => {
                res.status(200).json({product})
            })
            .catch(next)
    }
    static productById(req, res, next){
        const id = req.params.id
        Product.findByPk(id)
            .then(product => {
                res.status(200).json({product})
            })
    }
    static update(req, res, next){
        const id = req.params.id
        const updateProduct = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }
        Product.update(updateProduct, {
                where : {
                    id
                }
            })
            .then(product => {
                res.status(200).json({product})
            })
            .catch(next)
    }
    static delete(req, res, next){
        const id = req.params.id
        Product.destroy({
                where : {
                    id
                }
            })
            .then(product => {
                res.status(200).json({product})
            })
            .catch(next)
    }
}

module.exports = Controller