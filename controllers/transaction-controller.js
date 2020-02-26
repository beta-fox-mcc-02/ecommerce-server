const { Transaction, Product, User } = require('../models');

class Controller {
    static findAll(req, res, next) {
        Transaction.findAll()
            .then(result => {
                if (result) {
                    res.status(200).json(status);
                } else {
                    const error = {
                        name: 'Not found',
                        message: 'No transaction found'
                    };
                    next(error);
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static create(req, res, next) {
        Transaction.create({
            UserId: req.decoded.id,
            ProductId: req.body.id,
            status: req.body.status,
            quantity: req.body.quantity,
            sum: req.body.sum
        })
    }  
}

module.exports = Controller;
