const { Product } = require('../models/index');

class Controller {
    static addProduct(req, res, next) {
        let newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        };
        Product.create(newProduct)
            .then(newProduct => {
                res.status(201).json({
                    id: newProduct.id,
                    name: newProduct.name,
                    image_url: newProduct.image_url,
                    price: newProduct.price,
                    stock: newProduct.stock
                });
            })
            .catch(err => {
                next(err);
            })
    }
    static editProduct(req, res, next) {
        let update = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        };
        Product.update(update, {
            where: {
                id: req.params.productId
            },
            returning: true
        })
            .then(data => {
                if (data[0]) {
                    res.status(200).json(data[1][0])
                } else {
                    next({
                        status: 404,
                        message: 'Data not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller;