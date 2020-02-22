const {
    Product
} = require("../models");

class ProductController {
    static findAll(req, res, next) {
        Product.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(err);
            });
    }

    static create(req, res, next) {
        Product.create({
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stocks: req.body.stocks
            })
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                next(err);
            });
    }

    static findOne(req, res, next) {
        Product.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    let err = {
                        err: "Not found",
                        msg: "Data not found"
                    }
                    next(err)
                }

            })
            .catch(err => {
                next(err);
            });
    }

    static update(req, res, next) {
        Product.update({
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stocks: req.body.stocks
            }, {
                where: {
                    id: req.params.id
                },
                returning: true
            })
            .then(data => {
                // console.log(data[1][0].dataValues, "==========then dari controller update")
                res.status(201).json(data[1][0].dataValues)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                // console.log(data, "================response data delete controller")
                res.status(200).json({
                    msg: `deleted successfully`
                })
            })
            .catch(err => {
                // console.log(err, "+++++++++++++++++++++++++error delete")
                next(err)
            })
    }
}

module.exports = ProductController;