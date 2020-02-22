const { User } = require('../models')
const bcrypt = require('../helper/bcryptjs')
const jwt = require('../helper/jwt')


class ControllerUser{
    static register(req,res,next){
        const {email , password, username} = req.body
        let input = {
            username,
            email,
            password,
            RoleId : 2
        }
        User.findOne({
            where : {
                email
            }
        })
            .then(data => {
                if(!data){
                    return User.create(input)
                }
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static registerAdmin(req,res,next){
        const {email , password} = req.body
        console.log(email)
        let input = {
            email,
            password,
            RoleId : 1
        }
        User.findOne({
            where : {
                email
            }
        })
            .then(data => {
                if(!data){
                    return User.create(input)
                }
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                // console.log(err)

                next(err)
            })
    }
    static login(req,res,next){
        const { email , password,username,role, } = req.body
        User.findOne({
            where : {
                email
            }
        })
            .then(data => {
                if(data){

                    let input = {
                        username,
                        email,
                        password,
                        role
                    }
                    let validate = bcrypt.compare(password,data.password)
                    if(validate){
                        const token = jwt.generate(input)
                        res.status(200).json({token})
                        
                    }
                }
                else{
                    res.status(404).json({
                        msg : "Email doesn't exist"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerUser