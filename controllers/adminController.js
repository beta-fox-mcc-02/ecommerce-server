const {
    Admin
} = require('../models')
const bcrypt = require("../helpers/bcrypt")
const jwt = require("jsonwebtoken")
const private_key = 'secret'

class AdminController {
    static register(req, res, next) {
        Admin.create({
                email: req.body.email,
                password: req.body.password
            })
            .then(data => {
                res.status(201).json({
                    email: data.email,
                    password: data.password,
                    msg: "Account registered successfully"
                });
            })
            .catch(err => {
                next(err)
            });
    }

    static login(req, res, next) {
        Admin.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(data => {
                if (data) {
                    let checkPassword = bcrypt.check(req.body.password, data.password)
                    if (checkPassword) {
                        let payload = {
                            email: data.email,
                            id: data.id,
                        }
                        let token = jwt.sign({
                                payload
                            },
                            private_key
                        );
                        res.status(200).json({
                            email: data.email,
                            token
                        });
                    } else {
                        let err = {
                            err: "Login Failed",
                            msg: "Invalid email or password"
                        }
                        next(err)
                    }
                } else {
                    let err = {
                        err: "Login Failed",
                        msg: "Invalid email or password"
                    }
                    next(err)
                }
            })
            .catch(err => {
                next(err)
            });
    }
}

module.exports = AdminController