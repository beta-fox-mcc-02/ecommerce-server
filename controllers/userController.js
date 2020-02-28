const { User } = require('../models')
const { checkPassword } = require('../helpers/password')
const { generatetoken } = require('../helpers/jwt')

class UserController {
    static register (req, res, next) {
        const {first_name, last_name, address, email, password, role} = req.body
        User.create({
            first_name, last_name, address, email, password, role: role || false
        })
            .then(user => {
                res.status(201).json({
                    first_name: user.first_name, 
                    last_name: user.last_name, 
                    address: user.address, 
                    email: user.email,
                    msg: 'Register success'
                })
            })
            .catch(next)
    }

    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (user === null) {
                    next({
                        status: 400,
                        msg: "Invalid Email"
                    })
                } else {
                    const check = checkPassword(password, user.password)
                    if (check) {
                        const token = generatetoken({
                            id: user.id,
                            email: user.email,
                            role: user.role
                        })
                        res.status(200).json({
                            msg: "success login",
                            role: user.role,
                            token
                        })
                    } else {
                        next({
                            status: 400,
                            msg: "Invalid Password"
                        })  
                    }
                }
            })
            .catch(next)
    }
}

module.exports = UserController