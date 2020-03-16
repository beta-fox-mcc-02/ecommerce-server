const { Transaction, Product, User } = require('../models');

class Controller {
    static currentItem(req, res, next) {
        const id = req.decoded.id;
        Transaction.findAll({
            where: {
                UserId: id,
                status: true
            },
            include: [{ model: Product, attributes: ['name', 'price'] },
                    { model: User}]
        })
            .then(result => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    const error = {
                        name: 'Not found',
                        message: 'No cart found'
                    };
                    next(error);
                }
            })
            .catch(err => {
                console.log(err);
                next(err);
            })
    }

    static history(req, res, next) {
        Transaction.findAll({
            where: {
                UserId: req.decoded.id,
                status: true,
            },
            include: [{ model: Product, attributes: ['name', 'price'] }]
        })
            .then( result => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    const error = {
                        name: 'Not found',
                        message: 'No cart found'
                    }
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static create(req, res, next) {
        const { ProductId, status, quantity} = req.body;
        let ProductName = '';

        Product.findOne({
            where: {id: ProductId}
        })
          .then(product => {
              ProductName = product.name;
              
              return Transaction.create({
                UserId: req.decoded.id,
                ProductId,
                status,
                quantity,
                sum: quantity * product.price
            })
          })
          .then( _=> {
              res.status(201).json({message: `Added ${ProductName} to card`});
          })
          .catch(err => {
              console.log(err);
              next(err);
          })
    }

    static delete(req, res, next) {
        Transaction.destroy({
            where: {
                id: req.prams.id
            }
        })
            .then(_ => {
                res.status(200).json({message: 'Success delete cart'});
            })
            .catch(err => {
                next(err);
            })
    }

    static update(req, res, next) {
        const { ProductId, status, quantity } = req.body;

        Product.findOne({
            where: {
                id: ProductId
            }
        })
            .then(product => {
                if (product.stock < quantity) {
                    const error = {
                        message: 'Stock is not enough'
                    }
                    next(error);
                } else {
                    Transaction.update({
                        UserId: req.params.id,
                        ProductId,
                        status,
                        quantity,
                        sum: product.price * quantity
                    })
                    .then(_=> {
                        res.status(200).json({ message: 'Success updating cart' });
                    })
                    .catch(err => {
                        next(err);
                    })
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = Controller;
