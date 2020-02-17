const {Admin, Product} = require('../models')
const {createToken} = require('../helpers/jwt')
const {compareLogin} = require('../helpers/bcrypt')

class Controller{
    static register(req, res, next){
        const newAdmin = {
            email : req.body.email,
            password : req.body.password
        }
        Admin.create(newAdmin)
            .then(admin => {
                res.status(201).json(admin)
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
                        name: "SequelizeValidationError",
                        errors : [{ message : 'email / password is wrong'}]
                    }
                    next(err)
                }
            })
            .catch(next)
    }
}

module.exports = Controller