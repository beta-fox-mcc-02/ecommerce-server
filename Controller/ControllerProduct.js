const { Product } = require('../models')
const bcrypt = require('../helper/bcryptjs')
const jwt = require('../helper/jwt')

class ControllerProduct {
    static create (req,res,next){
        const {name , description , price , stock , image_url} = req.body
        const input = {
            name,
            description,
            price,
            stock,
            image_url
        }
        Product.create(input)
        // console.log(input ,'ININ INPUTT')
            .then(data => {
                res.status(200).json({data})
            })
            .catch(err =>{
                // console.log(err.errors.message)
                next(err)
            })
    }
    static readAll (req,res,next){
        Product.findAll()
            .then(data => {
                console.log(data,'INI DATA')
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static findOne(req,res,next){
        const id = +req.params.id
        Product.findOne({
            where : {
                id : id
            }
        })
            .then(data => {
                if(data){
                    res.status(200).json(data)
                }else{
                    next({
                        status : 404,
                        message : 'Data is undifiend'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static delete(req,res,next){
        const id = req.params.id
        Product.findOne({
            where : {
                id
            }
        })
            .then(data => {
                if(data){
                    return Product.destroy({
                        where : {
                            id
                        }
                    })
                }else{
                    res.status(404).json({
                        message : "Data is undifiend"
                    })
                }
            })
            .then(data => {
                res.status(200).json({
                    message : "Delete Succses"
                })
            })
            .catch(err => {
                next(err)
            })
    }
    static update (req,res,next){
        const id = req.params.id
        const {name , description , price , stock , image_url} = req.body
        console.log(name,'ini name')
        const input = {
            name,
            description,
            price,
            stock,
            image_url
        }
 Product.update(input,
        {
            where : {
                id 
            },
            returning : true
        })
            .then(data => {
                console.log(data, "INIIII")
                res.status(200).json({message : 'Update berhasil'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerProduct