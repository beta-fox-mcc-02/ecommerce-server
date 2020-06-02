const {Costumer, Cart, CartProduct, Product, sequelize, History} = require('../models')
const {createToken} = require('../helpers/jwt')
const {compareLogin} = require('../helpers/bcrypt')
const promises = []
const updateProduct = []
const historyProduct = []

class CostumerController {
    static register (req, res, next) {
        let token = ''
        const newCostumer = {
            email: req.body.email,
            password: req.body.password,
            balance: req.body.balance
        }
        Costumer.create(newCostumer)
            .then(costumer => {
                const pick = {
                    id : costumer.id,
                    email : costumer.email
                }
                token =  createToken(pick)
                return Cart.create({
                    CostumerId: costumer.id
                })
            })
            .then(response => {
                res.status(201).json({token})
            })
            .catch(next)
    }
    static login(req, res, next){
        const costumerLogin = {
            email : req.body.email,
            password : req.body.password
        }
        Costumer.findOne({
                where : {
                    email : costumerLogin.email
                }
            })
            .then(costumer => {
                // console.log(costumer)
                if(costumer){
                    let compare = compareLogin(costumerLogin.password, costumer.password)
                    if(compare){
                        const pick = {
                            id : costumer.id,
                            email : costumer.email
                        }
                        let token =  createToken(pick)
                        res.status(200).json({token})
                    }
                    else {
                        const err = {
                            name: "loginError"

                        }
                        next(err)
                    }
                }
                else{
                    const err = {
                        name: "loginError"
                    }
                    next(err)
                }
            })
            .catch(err => {
                // console.log(err)
                next()
            })
    }
    static data (req, res, next) {
        const id = req.decode.id
        Costumer.findOne({
                where: {
                    id
                },
                include: {
                    model: Cart,
                    include: Product
                }
            })
            .then(costumer => {
                res.status(200).json(costumer)
            })
            .catch(next)
    }
    static cart (req, res, next) {
        const id = req.decode.id
        CartProduct.findAll({
                include: [
                    {
                        model: Cart,
                        where: {
                            CostumerId: id
                        }
                    },
                    {
                        model: Product
                    }
                ]
            })
            .then(cart => {
                console.log(cart.cart)
                res.status(200).json(cart)
            })
            .catch(next)
    }
    static buy (req, res, next) {
        const putToCart = {
            CartId: req.body.CartId,
            ProductId: req.body.ProductId,
            quantity: req.body.quantity,
            isCheckout: false
        }
        CartProduct.create(putToCart)
            .then(cart => {
                res.status(201).json(cart)
            })
            .catch(next)
    }
    static cancelProduct (req, res, next) {
        const CartId = +req.headers.cartid
        const ProductId = +req.headers.productid
        CartProduct.destroy({
                where: {
                    CartId,
                    ProductId
                }
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }
    static checkout (req, res, next) {
        const carts = req.body
        for (let i = 0; i < carts.length; i++) {
            Product.findOne({where : {id : carts[i].ProductId}})
                .then(product => {
                    if (product.stock - carts[i].quantity < 0){
                        const err = {
                            name: 'transactionError',
                            message: 'One of your product is out of stock'
                        }
                        next(err)
                    }
                    else {
                        const newStock = product.stock - carts[i].quantity
                        const temp = {
                            id: carts[i].ProductId,
                            name: carts[i].Product.name,
                            image_url: carts[i].Product.image_url,
                            price: carts[i].Product.price,
                            stock: newStock
                        }
                        updateProduct.push(temp)
                        const temp2 = {
                            CartId: carts[i].CartId,
                            ProductId: carts[i].ProductId,
                            quantity: carts[i].quantity,
                            isCheckout: true,
                            invoice: new Date ()
                        }
                        promises.push(temp2)
                        const temp3 = {
                            CartId: carts[i].CartId,
                            name: carts[i].Product.name,
                            image_url: carts[i].Product.image_url,
                            quantity: carts[i].quantity,
                            invoice: new Date ()
                        }
                        historyProduct.push(temp3)
                        // console.log(updateProduct)
                        // console.log(promises)
                            console.log(i)
                        if (i+1 === carts.length) {
                            console.log('masuuuk')
                            CostumerController.productUpdate(req, res, next)
                        }
                    }
                })
                .catch(next)
        }
    }
    static productUpdate (req, res, next) {
        const cartUpdate = promises.map(el => {
            return CartProduct.update(el, {where: {CartId: el.CartId, ProductId: el.ProductId}})
        })
        Promise.all(cartUpdate)
            .then(data => {
                const historyUpdate = historyProduct.map(el => {
                    return History.create(el)
                })
                return Promise.all(historyUpdate)
            })
            .then(data => {
                const productUpdate = updateProduct.map(el => {
                    const product = {
                        name: el.name,
                        image_url: el.image_url,
                        price: el.price,
                        stock: el.stock
                    }
                    return Product.update(product, {where: {id: el.id}})
                })
                return Promise.all(productUpdate)
            })
            .then( success => {
                res.status(200).json(success)
            })
            .catch(next)
    }
    static history (req, res, next) {
        History.findAll()
            .then(history => {
                res.status(200).json(history)
            })
            .catch(next)
    }
}

module.exports = CostumerController