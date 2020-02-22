const { User, Admin } = require('../models')
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        console.log(req.body)
        Admin.create({
            username, email, password
        })
            .then(data => {
                res.status(201).json({
                    data,
                    message: 'success create'
                })
            })
            .catch(next)
    }
    static login(req, res, next) {
        const { email, password } = req.body
        
        Admin.findOne({ where: { email } })
        .then(data => {
            const user = User.findOne({ where: { email } })
            if (data) {
                const check = checkPassword(password, data.dataValues.password)
                const token = createToken(data.dataValues.id)
                // console.log(check, token, '===================')
                    if (check) {
                        res.status(200).json({
                            token,
                            message: 'success login admin'
                        })
                    } else {
                        next({
                            status: 400,
                            message: 'invalid password / email'
                        })
                    }
                } else {
                    return user
                }
            })
            .then(data => {
                if (data) {
                    const check = checkPassword(password, data.password)
                    const token = createToken(data.id)
                    if (check) {
                        res.status(200).json({
                            token,
                            message: 'success login'
                        })
                    } else {
                        next({
                            status: 400,
                            message: 'invalid password / email'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        message: 'email not found'
                    })
                }
            })
            .catch(next)
    }
}

module.exports = UserController