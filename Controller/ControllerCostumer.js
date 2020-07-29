const  { Cart, Product } = require('../models')

class ControllerCart {
    static AddProduct (req , res , next) {
        const { id } = req.body
        console.log(id)
        const idReq = req.currentId
        Cart.findOne(
            {
                where : {
                    UserId : idReq,
                    ProductId : id,
                }
            }
        )
            .then(data => {
                if(!data){
                    return Cart.create(
                        {
                            UserId : idReq,
                            ProductId : id,
                            quantity: 1
                        }
                    )
                }else{
                    res.status(404).json({message : 'data already added'})
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static deleted (req , res, next) {
        const { id } = req.params
        console.log(req.params.id)
        Cart.destroy(
            {
                where : {
                    id
                },
                attributes: {
                    include: ['id']
                }
            }
        )
            .then(data => {
                res.status(200).json(
                    {
                        message : 'Delete succses'
                    }
                )
            })
            .catch(err => {
                next(err)
            })
    }
    static findAll (req, res, next) {
        const idUser = +req.currentId
        console.log(idUser, "ini id")
        Cart.findAll(
            {
                where : {
                    UserId : idUser
                },
                include: [Product],
                attributes: {
                    include: ['id']
                },
                order: [
                    ['id', 'ASC']
                ]
            }
        )
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static addQty (req, res, next) {
        const id = req.body.id
        console.log(id,'ini adata')
        Cart.increment ('quantity',{
            where: {
                id : id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
    static descQty (req, res, next) {
        const { id } = req.body
        Cart.decrement('quantity', {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
        
    }
    static checkout (req, res, next) {
        let checkoutCart ;
        Cart.findAll({
            where: {
                UserId: req.currentId
            },
            include: [Product],
            attributes: {
                include: ['id']
            }
        })
        .then(data => {
            checkoutCart = data
            let promises = []
            data.forEach(el => {
                if(el.quantity <= el.Product.stock){
                    promises.push(Cart.destroy ({
                        where:{
                            id: el.id
                        }
                    }))
                } else {
                    next ( {
                        status : 404,
                        message: 'data undifiend'
                    })
                }
                return Promise.all(promises)
            })
        })
        .then(data => {
            let anotherPromises = []
                checkoutCart.forEach(el => {
                    anotherPromises.push(Product.decrement('stock',
                    {
                        by:el.quantity,
                        where: {
                            id : el.ProductId
                        }
                    })
                    )
                })
            return Promise.all(anotherPromises)
        })
        .then(data => {
            res.status(200).json({
                message: "yeay succses"
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ControllerCart