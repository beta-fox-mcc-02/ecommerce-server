const {Admin, Product} = require('../models')
const {createToken} = require('../helpers/jwt')
const {compareLogin} = require('../helpers/bcrypt')

class AdminController{
    static register(req, res, next){
        const newAdmin = {
            email : req.body.email,
            password : req.body.password
        }
        Admin.create(newAdmin)
            .then(admin => {
                const pick = {
                    id : admin.id,
                    email : admin.email
                }
                let token =  createToken(pick)
                res.status(201).json({token})
            })
            .catch(next)
    }
    static login(req, res, next){
        const adminLogin = {
            email : req.body.email,
            password : req.body.password
        }
        Admin.findOne({
                where : {
                    email : adminLogin.email
                }
            })
            .then(admin => {
                // console.log(admin)
                if(admin){
                    let compare = compareLogin(adminLogin.password, admin.password)
                    if(compare){
                        const pick = {
                            id : admin.id,
                            email : admin.email
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
}

module.exports = AdminController