const { User } = require('../models')
const { createToken, comparePassword } = require('../helpers/auth')

class UserController {
    static register(req, res, next) {
        const { email, first_name, last_name, password } = req.body
        const user = {
            email,
            first_name,
            last_name,
            password,
            RoleId: 2 // HARDCODED TO CUSTOMER
        }
        User.create(user)
            .then(result => {
                const payload = {
                    id: result.id,
                    email: result.email,
                    first_name: result.first_name,
                    last_name: result.last_name
                }

                const token = createToken(payload)

                res.status(201).json({ token })
            })
            .catch(next)
    }
    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ where: { email } })
            .then(result => {
                if (result) {
                    const isLogin = comparePassword(password, result.password)

                    if (isLogin) {
                        const payload = {
                            id: result.id,
                            email: result.email,
                            first_name: result.first_name,
                            last_name: result.last_name
                        }
                        const token = createToken(payload)
                        res.status(200).json({ token })
                    } else {
                        next({ name: 'wrongauth' })
                    }
                } else {
                    next({ name: 'wrongauth' })
                }
            })
            .catch(next)
    }
}

module.exports = UserController
