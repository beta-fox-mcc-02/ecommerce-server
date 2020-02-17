const { User } = require('../models')
const { createToken } = require('../helpers/auth')

class UserController {
    static create(req, res, next) {
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
}

module.exports = UserController
