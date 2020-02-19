const { Administrator } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class AdminController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        Administrator.create({ username, email, password })
            .then(admin => {
                res.status(201).json(admin)
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        Administrator.findOne({ where : { email } })
            .then(admin => {
                if(!admin) {
                    next({ name: 'WrongEmail' })
                }
                else {
                    console.log('heyyy ini controller heyyy')
                    const matched = comparePassword(password, admin.password)
                    if(matched) {
                        const payload = {
                            id: admin.id,
                            email: admin.email
                        }
                        const access_token = generateToken(payload)
                        res.status(200).json({ access_token })
                    }
                    else {
                        next({ name: 'WrongPassword' })
                    }
                }
            })
            .catch(next)
    }
}

module.exports = AdminController