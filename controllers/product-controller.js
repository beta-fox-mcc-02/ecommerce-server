const {Product} = require('../models');

class Controller {
    static create(req, res, next) {
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        })
            .then(newProduct => {
                res.status(201).json(newProduct);
            })
            .catch(err => {
                next(err);
            })
    }

    static findAll(req, res, next) {
        Product.findAll()
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        Product.destroy({
            where: {id: req.params.id}
        })
            .then(result => {
                let obj = {}
                if(result === 1) {
                    obj.message = 'Product is deleted';
                    res.status(200).json(obj);
                } else {
                    const error = {
                        name: 'Not found',
                        message: 'Product is not exist'
                    }
                    next(error)
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static update(req, res, next) {
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }, {
            where: {id: req.params.id},
            returning: true
        })
            .then(product => {
                let obj = {}
                if(product[0] === 1) {
                    obj.name = product[1][0].dataValues.name;
                    obj.image_url = product[1][0].dataValues.image_url;
                    obj.price = product[1][0].dataValues.price;
                    obj.stock = product[1][0].dataValues.stock;
                    obj.message = `Success updated product ${product[1][0].dataValues.id}`
                    res.status(200).json(obj);
                } else {
                    const error = {
                        name: 'Not found',
                        message: 'Product is not exist'
                    }
                    next(error);
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller;