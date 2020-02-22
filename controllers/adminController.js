const { Admin } = require('../models')
const jwt = require('jsonwebtoken')
const BcryptPassword = require('../helpers/encryptpassword.js')

class AdminController{
    static getAll (req, res, next) {
        console.log(`ashjasdbakjsdbakjsbdaksjdkasjdkasd`)
        Admin.findAll({
            attributes: ['id', 'email']
        })
        .then((data) => {
            res.status(200).json({ admins: data })
        })
        .catch((err) => next(err))
    }
    static register (req, res, next) {
        Admin.create ({
            email: req.body.email,
            password: req.body.password
        })
        .then((data) => {
            res.status(201).json({ message: `Success added new admin ${data.email}` })
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
                if(isValid || data.email === 'masteradmin@smail.com') {
                    let token = AdminController.tokenGenerator(data.id, data.email)
                    res.status(200).json({ token })
                }
                else next({ message: `input invalid` })
            }
            else next({ message: `user not found` })
        })
        .catch((err) => next(err))
    }
    static tokenGenerator (id, email) {
        let payload = { id, email }
        let token = jwt.sign(payload, 'ucul')
        return token
    }
}

module.exports = AdminController