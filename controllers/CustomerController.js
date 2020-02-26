const { Customer, Product } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class CustomerController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        Customer.create({ username, email, password })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        Customer.findOne({   
            include: [{
                model: Product
            }] 
        })
            .then(user => {
                if(!user) {
                    next({ name: 'WrongEmail' })
                }
                else {
                    console.log('heyyy ini controller heyyy')
                    const matched = comparePassword(password, user.password)
                    if(matched) {
                        const payload = {
                            id: user.id,
                            email: user.email
                        }
                        const access_token = generateToken(payload)
                        res.status(200).json({ user, access_token })
                    }
                    else {
                        next({ name: 'WrongPassword' })
                    }
                }
            })
            .catch(next)
    }
}

module.exports = CustomerController