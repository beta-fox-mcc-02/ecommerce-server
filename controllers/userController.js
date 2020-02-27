const {
    User
} = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const private_key = 'secret'

class UserController {
    static register(req, res, next) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        })
            .then(data => {
                res.status(201).json(data)
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
            .then(data => {
                if(data) {
                    let passwordCheck = bcrypt.check(req.body.password, data.password)
                    if(passwordCheck) {
                        let payload = {
                                email: data.email,
                                id: data.id
                            }
                        let token = jwt.sign({
                                payload
                            }, 
                            private_key
                        );
                        res.status(200).json({
                            email: data.email,
                            token
                        })
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController