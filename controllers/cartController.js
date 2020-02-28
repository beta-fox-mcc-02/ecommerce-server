const { Cart, Product, User, sequelize } = require('../models') 

class CartController {
    static addToCart (req, res, next) {
        const { ProductId, price, totalItem } = req.body
        // Find one terlebih dahulu
        Cart.findOne({
            where: {
                ProductId,
                UserId: req.currentUserId
            }
        })
            .then(data => {
                // setelah data didapatkan
                // jika data didatabase null, maka create cart baru
                if (data === null) {
                    return Cart.create({
                        UserId: req.currentUserId,
                        ProductId,
                        quantity: totalItem,
                        price: totalItem * price
                    })
                } else {
                    // jika data di database ada. tetapi statusnya false, 
                    // maka data di update pirce dan quantitinya
                    return Cart.update({
                        quantity: Number(totalItem) + data.quantity,
                        price: (Number(totalItem) + data.quantity) * price
                    }, {
                        where: {
                            ProductId
                        }
                    })
                }
            })
            .then(data => {
                res.status(201).json({
                    msg: 'success add product to cart'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static fetchCart (req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.currentUserId,
                status: false
            }, 
            attributes: ['id', 'quantity', 'price'],
            include: [Product, User],
            order: [['id']]
        })
            .then(carts => {
                res.status(200).json({
                    msg: carts
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static destroy (req, res, next) {
        const id = req.params.id
        Cart.destroy({
            where: {
                id
            }
        })
            .then(data => {
                res.status(200).json({
                    msg: 'success delete from cart'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static update (req, res, next) {
        const price = req.body.quantity * req.body.price
        Cart.update({
            quantity: req.body.quantity,
            price
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json({
                    data,
                    msg: 'update success'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static payment (req, res, next) {
        // pada table cart fin All terlebih dahulu dengan paramter UserId dan statusnya false
        Cart.findAll({
            where: {
                UserId: req.params.id,
                status: false
            },
            include: [Product],
            attributes: ['id', 'quantity']
        })
            .then(data => {
                // setelah data didapatkan, menggunakna sequelize transaction.
                return sequelize.transaction(function (t) {
                    const promises = []
                    // pengecekan data yang mau dibeli user dan data stock tersedia
                    // jika stock kurang throw new error
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].quantity > data[i].Product.stock) {
                            throw new Error('Stock Unavailable')
                        } else {
                            // jika stock terpenuhi, maka akan melakukakn update pada dua table, Cart dan Product
                            promises.push(
                                Cart.destroy({
                                    where: {
                                        id: data[i].id
                                    }
                                }, {transaction: t}),
                                Product.update({
                                    name: data[i].Product.name,
                                    image_url: data[i].Product.image_url,
                                    price: data[i].Product.price,
                                    stock: data[i].Product.stock - data[i].quantity
                                }, {
                                    where: {
                                        id: data[i].Product.id
                                    }
                                }, {transaction: t})
                            )
                        }
                    }
                    return Promise.all(promises)
                });
            })
            .then(data => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                next(err)
            })

    }
}

module.exports = CartController