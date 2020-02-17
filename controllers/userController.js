const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static registerUser(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
        })
            .then(user => {
                res.status(201).json({
                    msg: 'user registered successfully',
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static registerAdmin(req, res, next) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'admin'
        })
            .then(user => {
                res.status(201).json({
                    msg: 'user registered successfully',
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if(user) {
                    let comparePass = comparePassword(req.body.password, user.password)
                    if(comparePass) {
                        let payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                        let access_token = generateToken(payload)
                        res.status(200).json({
                            msg: 'login success',
                            data: {
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                access_token: access_token
                            }
                        })
                    } else {
                        next({
                            name: 'LoginError',
                            msg: 'email / password incorrect'
                        })
                    }
                } else {
                    next({
                        name: 'LoginError',
                        msg: 'email / password incorrect'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController