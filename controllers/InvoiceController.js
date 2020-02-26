const {Cart, Invoice, Product} = require('../models')

class InvoiceController {
    static checkOut (req, res, next) {
        const products = req.body.cart
        let invoices = []
        let total = 0
        let promises = products.map((productCart) => {
            return Product.findByPk(productCart.ProductId)
            .then(product => {
                if (product) {
                    if (product.quantity < productCart) {
                        next({
                            status: 400,
                            name: 'Bad Request',
                            message: `sorry ${product.name} is out of stock`
                        })
                    } else {
                        let newObj = {
                            name: product.name,
                            price: product.price,
                            quantity: productCart.quantity,
                            image: product.image_url
                        }
                        total += (+product.price * +productCart.quantity)
                        invoices.push(newObj)

                        Product.update({stock: (product.stock - productCart.quantity)}, {where: {id: productCart.ProductId}, returning: true})
                        .then(data => {
                            res.status(200).json({
                                message: 'success updating stock'
                            })
                        })
                        .catch(err => {
                            next(err)
                        })
                    }
                } else {
                    next({
                        status: 404,
                        name: 'Not Found',
                        message: `sorry ${productCart.name} does not exists`
                    })
                }
            })
        })

        Promise.all(promises)
        .then(data => {
            let finalObj = {
                result: ''
            }
            finalObj.result = invoices
            let transactionDetails = JSON.stringify(finalObj, null, 2)
            let UserId = req.decoded.id          
            Cart.update({isActive: false}, {where: {UserId}, returning: true})
            .then(cart => {
                if (cart) {
                    let newInvoice = {
                        UserId: req.decoded.id, 
                        transactionDetails: transactionDetails, 
                        total: total
                    }
                    Invoice.create(newInvoice)
                    .then(newInvoice => {
                        res.status(201).json({newInvoice})
                    })
                    .catch(err => {
                        next(err)
                    })
                } else {
                    next({
                        status: 400,
                        name: 'Bad Request',
                        message: `something went wrong, cart does not exists`
                    })                     
                }
            })
            .catch(err => {
                next(err)
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        let UserId = +req.decoded.id
        Invoice.findAll({where: {UserId}}) 
        .then((invoice) => {
            if (invoice) {
                res.status(200).json({invoice})
            } else {
                next({
                    status: 400,
                    name: 'Bad Request',
                    message: `something went wrong, invoice does not exists`
                })                
            }
        })
        .catch(err => {
            next(err)
        })
    }  
}

module.exports = InvoiceController