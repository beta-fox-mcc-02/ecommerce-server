const { User, Cart, Product } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    // user
    static userSignUp(req, res, next) {
        const { email, password, role } = req.body

        User.create({
            email: email,
            password: password,
            role: 'user'
        })
            .then(response => {
                res.status(201).json({
                    msg: 'success sign up user',
                    payload: {
                        id: response.id,
                        email: response.email,
                        role: response.role
                    } 
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static userSignIn(req, res, next) {
        const { email, password } = req.body
        let token
        let UserId

        User.findOne({
            where: {
                email: email
            }
        })
            .then(response => {
                const err = {
                    name: 'invalidInputSignIn'
                }

                if (response) {
                    const comparePw = comparePassword(password, response.password) // true or false
                    if (comparePw) {
                        const payload = {
                            id: response.id,
                            email: response.email,
                            role: response.role
                        }

                        UserId = response.id
                        token = generateToken(payload)

                        return Cart.findAll({
                            include: [ Product ]
                        })
                    } else {
                        next(err)
                    }
                } else {
                    next(err)
                }
            })
            .then(response => {
                res.status(200).json({  
                    msg: 'sign in success',
                    token,
                    UserId,
                    carts: response
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    // admin
    static adminSignUp(req, res, next) {
        const { email, password } = req.body

        User.create({
            email: email,
            password: password,
            role: 'admin'
        })
            .then(response => {
                res.status(201).json({
                    msg: 'success sign up admin',
                    payload: {
                        id: response.id,
                        email: response.email,
                        role: response.role
                    } 
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static adminSignIn(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: {
                email: email
            }
        })
            .then(response => {
                const err = {
                    name: 'invalidInputSignIn'
                }

                if (response) {
                    const comparePw = comparePassword(password, response.password) // true or false
                    if (comparePw) {
                        const payload = {
                            id: response.id,
                            email: response.email,
                            role: response.role
                        }

                        const token = generateToken(payload)

                        res.status(200).json({
                            msg: 'sign in success',
                            token
                        })
                    } else {
                        next(err)
                    }
                } else {
                    next(err)
                }
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = Controller