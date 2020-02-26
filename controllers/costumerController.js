const {Costumer, Cart, CartProduct, Product, sequelize} = require('../models')
const {createToken} = require('../helpers/jwt')
const {compareLogin} = require('../helpers/bcrypt')

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
        console.log(req.headers.cartid, 'carrrrrrrrrtrtttttrtrtrtrtrtrt')
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
        const carts = req.body.carts
        const promises = []
        for (let i = 0; i < carts.length; i++) {
            Product.findAll({where : {id : carts[i].productid}})
                .then(product => {
                    if (product.stock - carts[i].quantity < 0){
                        const err = {
                            name: 'transactionError',
                            message: 'One of your product is out of stock'
                        }
                        res.status(400).json(err)
                    }
                    else {
                        carts[i].stock = product.stock - carts[i].quantity
                        carts[i].isCheckout = true
                        carts[i].invoice = new Date ()
                        promises.push(carts) 
                    }
                })
        }
        
    }
}

module.exports = CostumerController