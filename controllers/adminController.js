const { Admin } = require('../models')
const BcryptPassword = require('../helpers/encryptpassword.js')
const jwt = require('jsonwebtoken')

class AdminController{
    static register(req, res, next) {
        Admin.create({
            email: req.body.email,
            password: req.body.password
        })
        .then((data) => {
            res.status(201).json({
                email: data.email,
                password: data.password
            })
        })
        .catch((err) => next(err))
    }

    static login(req, res, next) {
        Admin.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((data) => {
            if(data) {
                let isValid = BcryptPassword.compare(req.body.password, data.password)
                if(isValid) {
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    let token = jwt.sign(payload, 'ucul')
                    res.status(200).json({ token })
                }
                else next({ message: `input invalid` })
            }
            else next({ message: `user not found` })
        })
        .catch((err) => next(err))
    }
}

module.exports = AdminController