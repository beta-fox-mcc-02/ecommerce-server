const {
    Category,
    Product
} = require('../models')

class categoryController {
    static findAll(req, res, next) {
        Category.findAll({
            include: [{
                model: Product
            }]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next) {
        Category.create({
            name: req.body.name
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static findOne(req, res, next) {
        Category.findOne({
            include: [{
                model: Product
            }]
        },{
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(data){
                    res.status(200).json(data)
                } else {
                    let err = {
                        err: "Not found",
                        msg: "Data not found"
                    }
                    next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        Category.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(data => {
                res.status(201).json(data[1][0].dataValues)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        Category.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json({
                    msg: 'Data deleted successfully'
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = categoryController