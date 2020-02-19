const { Admin } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class AdminControllers {
    static register(req, res, next) {
        let payload = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        Admin.create(payload)
            .then(admin => {
                res.status(201).json(admin)
            })
            .catch(next)
    }

    static login(req, res, next) {
        let payload = {
            email : req.body.email,
            password : req.body.password
        }
        Admin.findOne({
            where : {
                email : payload.email
            }
        })
            .then(admin => {
                if (admin) {
                    console.log('MASUK CONTROLLER =========')
                    let status = checkPassword(payload.password, admin.password)
                    console.log(status, 'STATUS')
                    if (status) {
                        console.log('MASUK STATUS SUCCESS')
                        let adminData = {
                            id : admin.id,
                            name : admin.name,
                            email : admin.email
                        }
                        console.log(adminData)
                        console.log('HALLLLOOOOOO')
                        let token = generateToken(adminData)
                        res.status(200).json({
                            access_token : token
                        })
                    } else {
                        next({
                            name : "Email/Password Incorrectly"
                        })
                    }
                } else {
                    next({
                        name : "Email/Password Incorrectly"
                    })
                }
            })
            .catch(next)
    }
}

module.exports = AdminControllers