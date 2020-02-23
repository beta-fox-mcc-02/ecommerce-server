const { Product } = require('../models');

class ProductController{
    static findAll(req, res, next) {
        console.log(1);
        
        Product.findAll()
            .then(data => {
                console.log(data);
                
                res.status(200).json({
                    data,
                })
            })
            .catch(next)
    }

    static findId(req, res, next) {
        const { id } = req.params;

        Product.findByPk(id, { include: [ 'Category' ]})
            .then(data=> {
                if(data) {
                    res.status(200).json({
                        data
                    })
                } else {
                    // next({
                    //     name: 404,
                    //     msg: 'Data PRODUCT not found',
                    //     process: 'Find data PRODUCT by PK'
                    // })
                    const err = {
                        name: "errFindProduct"
                    }
                    next(err)
                }
            })
            .catch(err => {
                // next({
                //     name: err.name,
                //     msg: err,
                //     process: 'Find PRODUCT by ID'
                // })
                next(err);
            })
    }

    static create(req, res, next) {
        const payload = {
            name : req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        } 
console.log('data controler'. payload);

        Product.create(payload)
            .then(result => {
                console.log(result);
                
                res.status(201).json({
                    data: result
                })
            })
            .catch(err => {
                // next({
                //     name: err.name,
                //     msg: err,
                //     process: 'Input PRODUCT'
                // })
                next(err);
            })
    }

    static update(req, res, next) {
        const id = Number(req.params.id);

        const payload = {
            name : req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        } 

        Product.update(data, { where: { id }, returning: true})
            .then(result => {
                if(result[0] > 0) {
                    res.status(201).json({
                        data: result[0][1],
                        msg: 'Update data PRODUCT success'
                    })
                } else {
                    next({
                        name: 404,
                        msg: 'No rows UPDATED PRODUCT data',
                        process: 'Update PRODUCT data'
                    })
                }
                
            })
            .catch(err => {
                next({
                    name: err.name,
                    msg: err,
                    process: 'Update PRODUCT'
                })
            })
    }

    static delete(req, res, next) {
        const id = Number(req.params.id);

        Product.destroy({ where: { id }})
            .then(data => {
                if(data) {
                    res.status(200).json({
                        data,
                        msg: 'DELETING PRODUCT data success'
                    })
                } else {
                    next({
                        name: 404,
                        msg: 'No rows DELETED PRODUCT data'
                    })
                }
            })
            .catch(err => {
                next({
                    name: err.name,
                    msg: err,
                    process: 'Delete PRODUCT'
                })
            })
    }
}

module.exports = ProductController;